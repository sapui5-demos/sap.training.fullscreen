sap.ui.controller("sap.training.fullscreen.view.NotFound", {

	getRouter: function() {
		return sap.ui.core.UIComponent.getRouterFor(this);
	},

	onNavBack: function(oEvent) {
		var oHistory, sPreviousHash, oRouter;

		oHistory = sap.ui.core.routing.History.getInstance();
		sPreviousHash = oHistory.getPreviousHash();

		if (sPreviousHash !== undefined) {
			window.history.go(-1);
		} else {
			oRouter = this.getRouter();
			oRouter.navTo("overview", true /*no history*/ );
		}
	}

});