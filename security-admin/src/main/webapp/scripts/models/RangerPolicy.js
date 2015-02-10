/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

 
define(function(require){
	'use strict';	

	var RangerPolicyBase	= require('model_bases/RangerPolicyBase');
	var XAUtils		= require('utils/XAUtils');
	var XAEnums		= require('utils/XAEnums');
	var localization= require('utils/XALangSupport');

	var RangerPolicy = RangerPolicyBase.extend(
	/** @lends RangerPolicy.prototype */
	{
		/**
		 * RangerPolicy initialize method
		 * @augments RangerPolicyBase
		 * @constructs
		 */
		initialize: function() {
			this.modelName = 'RangerPolicy';
			this.bindErrorEvents();
		},
		/**
		 * @function schema
		 * This method is meant to be used by UI,
		 * by default we will remove the unrequired attributes from serverSchema
		 */

		schemaBase : function(){
			var attrs = _.omit(this.serverSchema, 'id', 'createDate', 'updateDate', "version",
					"createDate", "updateDate", "permList", "status", "updatedBy", "isSystem");

			_.each(attrs, function(o){
				o.type = 'Hidden';
			});

			// Overwrite your schema definition here
			return _.extend(attrs,{
				id : {
					type		: 'Text',
					title		: 'Policy ID *',
					validators	: ['required'],
					editorAttrs 	:{ 'disabled' : "true"},

				},
				name : {
					type		: 'Text',
					title		: 'Policy Name *',
					validators	: ['required'],
					editorAttrs 	:{ maxlength: 255},

				},
				description : {
					type		: 'TextArea',
					title		: 'Description',
					validators	: []
				},
				isEnabled : {
					type		: 'Switch',
					title		: '',//localization.tt("lbl.policyStatus"),
					onText		: 'enabled',
					offText		: 'disabled',
					width		: '80',
					switchOn	: true
				},
				isRecursive : {
					type		: 'Switch',
					title		: localization.tt('lbl.includesAllPathsRecursively'),
					onText 		: 'YES',
					offText		: 'NO',
					switchOn	: false,
				},
				isAuditEnabled : {
					type		: 'Switch',
					title		: localization.tt("lbl.auditLogging"),
					onText 		: 'YES',
					offText		: 'NO',
					switchOn	: true
				},
			});
		},

		/** This models toString() */
		toString : function(){
			return this.get('name');
		}

	}, {
		// static class members
	});

    return RangerPolicy;
	
});


