sap.ui.define([
		"sap/ui/core/mvc/Controller",
		"sap/m/MessageBox",
		"sap/ui/model/odata/ODataModel",
		"sap/m/Button",
		"sap/m/Dialog",
		"sap/m/List",
		"sap/m/StandardListItem",
		"sap/ui/core/BusyIndicator",
		"jquery.sap.global"
	],
	function(Controller, MessageBox, ODataModel, Button, Dialog, List, StandardListItem, BusyIndicator) {
		"use strict";
		return Controller.extend("z.ZBOXDISPATCH.controller.View1", {
			//Init flux
			onInit: function() {
					/*				var oView = this.getView();
									var osite = oView.byId("__PLANT");
									var oData = new ODataModel("/sap/opu/odata/sap/ZGET_PLANT_SRV/", true);
									var URL = "/S_T001WSet(Type='02')";
									BusyIndicator.show();
									oData.read(URL, null, null, true, function(response) {
										BusyIndicator.hide();
										var site = response.EPlant + " " + response.ET001w.Name1;
										//var Cage = response.Cage;
										osite.setText(site);
										//var oController = sap.ui.getCore().byId("idMY_VIEW1").getController();
									}, function(error) {
										BusyIndicator.hide();
										MessageBox.error(JSON.parse(error.response.body).error.message.value, {
											title: "Error"
										});
										//promise.reject();
									});*/
				}
				/*,
							CheckBoxRec: function(oEvent) {
								var box = this.getView().byId("BOX").getValue();
								var oController = this;
								if (box !== "") {
									var oData = new ODataModel("/sap/opu/odata/sap/ZCHECK_VALUE_SCAN_SRV/", true);
									var URL = "/MessageSet(PValue='10" + box + "')";
									BusyIndicator.show();
									oData.read(URL, null, null, true, function(response) {
										BusyIndicator.hide();
										if (response.EMessage !== "" && response.EZtype === "E") {
											oController.getView().byId("BOX").setValue("");
											MessageBox.show(response.EMessage, MessageBox.Icon.ERROR);
										} else {
											oController.getView().byId("BOX").setEnabled(false);
											oController.getView().byId("Article").setVisible(true);
											oController.getView().byId("Finish").setVisible(true);
											jQuery.sap.delayedCall(500, this, function() {
												oController.getView().byId("SearchArt").focus();
											});
											//oController.BoxReceipt();
										}
									}, function(error) {
										BusyIndicator.hide();
										MessageBox.error(JSON.parse(error.response.body).error.message.value, {
											title: "Error"
										});
									});
								}
							},
							FinishBox: function(oEvent) {
								var oController = this;
								MessageBox.show(
									"Les données vont être sauvegardées ?", {
										icon: MessageBox.Icon.INFORMATION,
										title: "Confirmation",
										actions: ["Accepter", "Annuler"],
										onClose: function(oAction) {
											if (oAction === "Accepter") {
												oController.SaveData();
											}
										}
									}
								);
							},

							SaveData: function(oEvent) {
								var oController = this;
								var box = this.getView().byId("BOX").getValue();
								var oData = new ODataModel("/sap/opu/odata/sap/ZRETURN_DC_SRV/", true);
								var URL = "/ItemsSet(ZembArt='K" + box + "')";
								BusyIndicator.show();
								oData.read(URL, null, null, true, function(response) {
									BusyIndicator.hide();
									if (response.EMessage !== "" && response.EZtype === "E") {
										oController.getView().byId("BOX").setValue("");
										MessageBox.show(response.EMessage, MessageBox.Icon.ERROR);
									} else {
										oController.getView().byId("BOX").setEnabled(true);
										oController.getView().byId("BOX").setValue("");
										oController.getView().byId("Article").setVisible(false);
										oController.getView().byId("Finish").setVisible(false);
										jQuery.sap.delayedCall(500, this, function() {
											oController.getView().byId("BOX").focus();
										});
										//oController.BoxReceipt();
									}
								}, function(error) {
									BusyIndicator.hide();
									MessageBox.error(JSON.parse(error.response.body).error.message.value, {
										title: "Error"
									});
								});
							},

							searchArt: function(oEvent) {
								var oController = this;
								var material = this.getView().byId("SearchArt").getValue();
								//var box = this.getView().byId("BOX").getValue();
								var oData = new ODataModel("/sap/opu/odata/sap/ZRETURN_DC_SRV/", true);
								var URL = "/ZCHECK_VALUE_SCAN_SRV/MessageSet(PValue='11" + material + "')";
								BusyIndicator.show();
								oData.read(URL, null, null, true, function(response2) {
									BusyIndicator.hide();
									if (response2.EMessage !== "" && response2.EZtype === "E") {
										oController.getView().byId("SearchArt").setValue("");
										MessageBox.show(response2.EMessage, MessageBox.Icon.ERROR);
									} else {
										oController.traiteart();
									}
								}, function(error) {
									BusyIndicator.hide();
									MessageBox.error(JSON.parse(error.response.body).error.message.value, {
										title: "Error"
									});
								});
							},

							traiteart: function(oEvent) {
								//var oView = this.getView();
								//var oart = oView.byId("SearchArt");
								var oController = this;
								var box = this.getView().byId("BOX").getValue();
								var material = this.getView().byId("SearchArt").getValue();
								var searchString = box + "--" + material;
								//var material  = this.getView().byId("SearchArt").setEnabled(false);
								var swit = this.getView().byId("Defect").getState();
								var oData = new ODataModel("/sap/opu/odata/sap/ZRETURN_DC_SRV/", true);
								var URL = "";
								if (swit === false) {
									URL = "/ItemsSet(ZembArt='O" + searchString + "')";
								} else {
									URL = "/ItemsSet(ZembArt='F" + searchString + "')";
								}
								BusyIndicator.show();
								oData.read(URL, null, null, true, function(response) {
									BusyIndicator.hide();
									if (response.E_MESSAGE !== "" && response.E_ZTYPE === "E") {
										oController.getView().byId("CAGE").setValue("");
										MessageBox.show(response.E_MESSAGE, MessageBox.Icon.ERROR);
									} else {
										if (swit === false && response.Nltyp !== "R") {
											jQuery.sap.delayedCall(500, this, function() {
												oController.getView().byId("BIN_INPUT").focus();
											});
											oController.getView().byId("SearchArt").setEnabled(false);
											oController.getView().byId("H_DESCR").setVisible(true);
											oController.getView().byId("H_STATUS").setVisible(true);
											oController.getView().byId("H_QTY").setVisible(true);
											oController.getView().byId("H_DEST").setVisible(true);
											oController.getView().byId("H_CONF").setVisible(true);
											if (response.Weight !== "              0.000") {
												oController.getView().byId("H_STORE").setVisible(true);
												oController.getView().byId("H_WEIGHT").setVisible(true);
											}
											//  oController.getView().byId("H_VOL").setVisible(true);
											oController.getView().byId("Finish").setVisible(false);
											oController.getView().byId("__desc").setText(response.Maktx);
											oController.getView().byId("__status").setText(response.Status);
											//response.Menge = response.Menge.toFixed(1);
											oController.getView().byId("__qty").setText(response.Menge);
											oController.getView().byId("__dest").setText(response.Nltyp);
											oController.getView().byId("__destbin").setText(response.Nlpla);
											oController.getView().byId("__store").setText(response.Nlpla);
											oController.getView().byId("__weight").setText(response.Weight);
											// oController.getView().byId("__vol").setText(response.Volume);
											var to = oController.getView().byId("Tror");
											to.setText(response.TANUM);
											//var text = to.getText();
										} else {
											oController.getView().byId("SearchArt").setEnabled(true);
											oController.getView().byId("Finish").setVisible(true);
											oController.getView().byId("SearchArt").setValue("");
											jQuery.sap.delayedCall(500, this, function() {
												oController.getView().byId("SearchArt").focus();
											});
											oController.getView().byId("Defect").setState(false);
											MessageBox.show(response.E_MESSAGE, MessageBox.Icon.SUCCESS);
										}
									}
								}, function(error) {
									BusyIndicator.hide();
									MessageBox.error(JSON.parse(error.response.body).error.message.value, {
										title: "Error"
									});
								});
							},

							searchBin: function(oEvent) {
								var oController = this;
								var Bin_input = this.getView().byId("BIN_INPUT").getValue();
								var BIN = this.getView().byId("__destbin").getText();
								if (Bin_input !== BIN) {
									oController.getView().byId("BIN_INPUT").setValue("");
									MessageBox.show("Scan a valid Bin ! ", MessageBox.Icon.ERROR);
								} else {
									var to = this.getView().byId("Tror").getText();
									var box = this.getView().byId("BOX").getValue();
									var material = this.getView().byId("SearchArt").getValue();
									var searchString = box + "--" + material + "--" + to;
									var oData = new ODataModel("/sap/opu/odata/sap/ZRETURN_DC_SRV/", true);
									var URL = "/ItemsSet(ZembArt='N" + searchString + "')";
									BusyIndicator.show();
									oData.read(URL, null, null, true, function(response2) {
										BusyIndicator.hide();
										if (response2.EMessage !== "" && response2.EZtype === "E") {
											MessageBox.show(response2.EMessage, MessageBox.Icon.ERROR);
										} else {
											oController.getView().byId("H_DESCR").setVisible(false);
											oController.getView().byId("H_STATUS").setVisible(false);
											oController.getView().byId("H_QTY").setVisible(false);
											oController.getView().byId("H_DEST").setVisible(false);
											oController.getView().byId("H_CONF").setVisible(false);
											oController.getView().byId("H_STORE").setVisible(false);
											oController.getView().byId("H_WEIGHT").setVisible(false);
											//oController.getView().byId("H_VOL").setVisible(false);
											oController.getView().byId("__desc").setText("");
											oController.getView().byId("__status").setText("");
											oController.getView().byId("__qty").setText("");
											oController.getView().byId("__dest").setText("");
											oController.getView().byId("__destbin").setText("");
											oController.getView().byId("__store").setText("");
											oController.getView().byId("__weight").setText("");
											//oController.getView().byId("__vol").setText('');
											oController.getView().byId("SearchArt").setEnabled(true);
											oController.getView().byId("SearchArt").setValue("");
											oController.getView().byId("BIN_INPUT").setValue("");
											oController.getView().byId("Finish").setVisible(true);
										}
									}, function(error) {
										BusyIndicator.hide();
										MessageBox.error(JSON.parse(error.response.body).error.message.value, {
											title: "Error"
										});
									});
								}
							}*/
		});
	});