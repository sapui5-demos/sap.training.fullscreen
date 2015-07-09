sap.ui.controller("sap.training.fullscreen.view.Overview", {

	getRouter: function() {
		return sap.ui.core.UIComponent.getRouterFor(this);
	},

	onPress: function(oEvent) {
		var oItem, oCtx, iProductId, oRouter;

		oItem = oEvent.getSource();
		oCtx = oItem.getBindingContext("product");
		iProductId = oCtx.getProperty("ID");

		oRouter = this.getRouter();

		oRouter.navTo("product", {
			productId: iProductId
		}, false /*with history*/ );
	}

});