(function($, F){

	F.Sum = F.Component.extend(/** @lends FooTable.Sum */{
		/**
		 * @summary The construct method for the component.
		 * @memberof FooTable
		 * @constructs Sum
		 * @param {FooTable.Table} table - The current instance of the plugin.
		 */
		construct: function(table){
			// call the constructor of the base class
			this._super(table, true);
			/**
			 * @summary A snapshot of the working set of rows prior to being trimmed by the paging component.
			 * @memberof FooTable.Sum#
			 * @name snapshot
			 * @type {Array}
			 */
			this.snapshot = [];
			/**
			 * @summary The total calculated in the predraw method for all values in the "id" column.
			 * @memberof FooTable.Sum#
			 * @name total
			 * @type {number}
			 */
			/**
			 * @summary The total calculated in the predraw method for all non-filtered values in the "id" column.
			 * @memberof FooTable.Sum#
			 * @name totalFiltered
			 * @type {number}
			 */
		},
		/**
		 * @summary Initializes the component and holds a reference to the two labels used to display the totals.
		 * @memberof FooTable.Sum#
		 * @function init
		 */
		init: function(){
		},
		/**
		 * @summary Hooks into the predraw pipeline after sorting and filtering have taken place but prior to paging.
		 * @memberof FooTable.Sum#
		 * @function predraw
		 * @description This method allows us to take a snapshot of the working set of rows before they are trimmed by the paging component and is called by the plugin instance.
		 */
		predraw: function(){
			this.snapshot = this.ft.rows.array.slice(0);
		},
		/**
		 * @summary Performs the actual updating of any UI as required.
		 * @memberof FooTable.Sum#
		 * @function draw
		 */
		draw: function(){
		},
		/**
		 * @summary Sums all values of the specified column and returns the total.
		 * @param {string} name - The name of the column to sum.
		 * @param {boolean} [filtered=false] - Whether or not to exclude filtered rows from the result.
		 * @returns {number}
		 */
		column: function(name, filtered){
			filtered = F.is.boolean(filtered) ? filtered : false;
			var total = 0, rows = filtered ? this.snapshot : this.ft.rows.all;
			for (var i = 0, l = rows.length, row; i < l; i++){
				row = rows[i].val();
				total += F.is.number(row[name]) ? row[name] : 0;
			}
			return total;
		},
		countfilter: function(name, value, filtered){
			filtered = F.is.boolean(filtered) ? filtered : false;
			var total = 0, rows = filtered ? this.snapshot : this.ft.rows.all;
			for (var i = 0, l = rows.length, row; i < l; i++){
				row = rows[i].val();
				if (row[name]==value) {
					total += 1;
				}
			}
			return total;
		},

		count: function(filtered) {
			var rows = filtered ? this.snapshot : this.ft.rows.all;
			return rows.length;
		}
	});

	// register the component using a priority of 450 which falls between filtering (500) and paging (400).
	F.components.register("sum", F.Sum, 450);

})(jQuery, FooTable);

(function(F){
	/**
	 * @summary Return the columns and rows as a properly formatted JSON object.
	 * @memberof FooTable.Table#
	 * @function toJSON
	 * @param {boolean} [filtered=false] - Whether or not to exclude filtered rows from the result.
	 * @returns {Object}
	 */
	F.Table.prototype.sum = function(name, filtered){
		return this.use(F.Sum).column(name, filtered);
	};

	F.Table.prototype.count = function(filtered){
		return this.use(F.Sum).count(filtered);
	};

	F.Table.prototype.countfilter = function(name, value,filtered){
		return this.use(F.Sum).countfilter(name, value,filtered);
	};

})(FooTable);
