sap.ui.controller("sap.training.fullscreen.view.Supplier", {

	onInit: function() {
	    
		var oRouter = this.getRouter();
		this._sProductId = null;

		this._aValidTabKeys = ["Info", "Address"];

		oRouter.getRoute("productSupplier").attachMatched(this._onRouteMatched, this);

	},

	getRouter: function() {
		return sap.ui.core.UIComponent.getRouterFor(this);
	},

	_onRouteMatched: function(oEvent) {
	    
		var oArgs, oView, oRouter, oIconTabBar;

		oRouter = this.getRouter();
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

		if (oArgs["?query"] && this._aValidTabKeys.indexOf(oArgs["?query"].tab) > -1) {
			oIconTabBar = this.byId("idIconTabBar");
			if (oIconTabBar.getSelectedKey() !== oArgs["?query"].tab) {
				oIconTabBar.setSelectedKey(oArgs["?query"].tab);
			}

		} else {
			//we want the default query param to be visible at all time.
			oRouter.navTo("productSupplier", {
				productId: this._sProductId,
				query: {
					tab: this._aValidTabKeys[0]
				}
			}, true /*no history*/ );
		}

	},

	_onBindingChange: function(oEvent) {
		var oView, oElementBinding;

		oView = this.getView();
		oElementBinding = oView.getElementBinding("product");

		// No data for the binding
		if (oElementBinding && !oElementBinding.getBoundContext()) {
			this.getRouter().getTargets().display("notFound");
		}
	},

	/**
	 * We use this to update the hash in case a new tab is selected.
	 * @param oEvent
	 */
	onTabSelect: function(oEvent) {
		var oRouter = this.getRouter();

		oRouter.navTo("productSupplier", {
			productId: this._sProductId,
			query: {
				tab: oEvent.getParameter("selectedKey")
			}
		}, true /*without history*/ );
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