sap.ui.controller("sap.training.fullscreen.view.Product", {

	onInit: function() {
		var oRouter = this.getRouter();
		oRouter.getRoute("product").attachMatched(this._onObjectMatched, this);
	},

	getRouter: function() {
		return sap.ui.core.UIComponent.getRouterFor(this);
	},

	_onObjectMatched: function(oEvent) {
		var oArgs, oView;
		oArgs = oEvent.getParameter("arguments");
		this._sProductId = oArgs.productId;
		oView = this.getView();

		oView.bindElement({
			path: "product>/Products(" + this._sProductId + ")",
			events: {
				change: this._onBindingChange.bind(this),
				dataRequested: function(oEvent) {
					oView.setBusy(true);
				},
				dataReceived: function(oEvent) {
					oView.setBusy(false);
				}
			}
		});
	},

	_onBindingChange: function(oEvent) {
		var oElementBinding;

		oElementBinding = this.getView().getElementBinding("product");

		// No data for the binding
		if (oElementBinding && !oElementBinding.getBoundContext()) {
			this.getRouter().getTargets().display("notFound");
		}
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
	},

	onShowSupplier: function(oEvent) {
		var oRouter = this.getRouter();
		oRouter.navTo("productSupplier", {
			productId: this._sProductId
		}, false /*with history*/ );
	}

});