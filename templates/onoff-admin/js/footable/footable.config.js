(function($, F){

	F.Config = F.Component.extend(/** @lends FooTable.Sum */{
		/**
		 * @summary The construct method for the component.
		 * @memberof FooTable
		 * @constructs Sum
		 * @param {FooTable.Table} table - The current instance of the plugin.
		 */
		construct: function(table){
			// call the constructor of the base class
			if (table.$el.hasClass('config'))
			{
				this._super(table, true);
				/**
				 * @summary A snapshot of the working set of rows prior to being trimmed by the paging component.
				 * @memberof FooTable.Sum#
				 * @name snapshot
				 * @type {Array}
				 */
				this.template = '<div class="form-element checkbox"><input data-value="prop" data-params="checked" data-serialize="true" data-field="#name" data-type="#type" data-title="#title" value="1" #visible type="checkbox" name="check-#index" id="check-#index"><label for="check-#index">#title</label></div>';
				/**
				 * @summary The total calculated in the predraw method for all values in the "id" column.
				 * @memberof FooTable.Sum#
				 * @name total
				 * @type {number}
				 */
				this._$selector = "";
				/**
				 * @summary The total calculated in the predraw method for all non-filtered values in the "id" column.
				 * @memberof FooTable.Sum#
				 * @name totalFiltered
				 * @type {number}
				 */
				//his.totalFiltered = 0;

				// hold references to any UI we need to update
				//this._$total = null;
				//this._$totalFiltered = null;
			}
		},
		/**
		 * @summary Initializes the component and holds a reference to the two labels used to display the totals.
		 * @memberof FooTable.Sum#
		 * @function init
		 */
		init: function(){
			this._$selector = $(".list-config #configForm");
			//this._$totalFiltered = $("#total-filtered");
		},
		/**
		 * @summary Hooks into the predraw pipeline after sorting and filtering have taken place but prior to paging.
		 * @memberof FooTable.Sum#
		 * @function predraw
		 * @description This method allows us to take a snapshot of the working set of rows before they are trimmed by the paging component and is called by the plugin instance.
		 */
		predraw: function(){
			this.snapshot = this.ft.rows.array.slice(0);
			//this.total = this.column("IdEntity");
			//this.totalFiltered = this.column("IdEntity", true);
		},
		/**
		 * @summary Performs the actual updating of any UI as required.
		 * @memberof FooTable.Sum#
		 * @function draw
		 */
		draw: function(){
			this._$selector.html(this.column());
			//this._$totalFiltered.text(this.totalFiltered);
		},
		/**
		 * @summary Sums all values of the specified column and returns the total.
		 * @param {string} name - The name of the column to sum.
		 * @param {boolean} [filtered=false] - Whether or not to exclude filtered rows from the result.
		 * @returns {number}
		 */
		column: function(){
			var columns = this.ft.columns.array;
			var html = "";

			for (var i = 0, l = columns.length, column; i < l; i++){
				column = columns[i];
				ischecked = column.hidden?"":"checked";
				if (column.title != '')
				{
					htmltemp = replaceAll('#index', i, this.template);
					htmltemp = replaceAll('#title', column.title, htmltemp);
					htmltemp = replaceAll('#visible',ischecked, htmltemp);
					htmltemp = replaceAll('#type',column.type, htmltemp);
					htmltemp = replaceAll('#name', column.name, htmltemp);
                    htmltemp = replaceAll('#title', column.title, htmltemp);

					html += htmltemp;
				}
//				total += F.is.number(row[name]) ? row[name] : 0;
			}
			return html;
		}
	});

	// register the component using a priority of 450 which falls between filtering (500) and paging (400).
	F.components.register("config", F.Config, 440);

})(jQuery, FooTable);

(function(F){
	/**
	 * @summary Return the columns and rows as a properly formatted JSON object.
	 * @memberof FooTable.Table#
	 * @function toJSON
	 * @param {boolean} [filtered=false] - Whether or not to exclude filtered rows from the result.
	 * @returns {Object}
	 */
	F.Table.prototype.config = function(){
		return this.use(F.Config).draw();
	};

})(FooTable);
