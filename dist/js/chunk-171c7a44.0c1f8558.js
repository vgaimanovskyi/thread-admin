(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-171c7a44"],{1681:function(t,e,i){},"4bd4":function(t,e,i){"use strict";i("4de4"),i("7db0"),i("4160"),i("caad"),i("07ac"),i("2532"),i("159b");var r=i("5530"),a=i("58df"),s=i("7e2b"),o=i("3206");e["a"]=Object(a["a"])(s["a"],Object(o["b"])("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(t){var e=Object.values(t).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput:function(t){var e=this,i=function(t){return t.$watch("hasError",(function(i){e.$set(e.errorBag,t._uid,i)}),{immediate:!0})},r={_uid:t._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?r.shouldValidate=t.$watch("shouldValidate",(function(a){a&&(e.errorBag.hasOwnProperty(t._uid)||(r.valid=i(t)))})):r.valid=i(t),r},validate:function(){return 0===this.inputs.filter((function(t){return!t.validate(!0)})).length},reset:function(){this.inputs.forEach((function(t){return t.reset()})),this.resetErrorBag()},resetErrorBag:function(){var t=this;this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(t){return t.resetValidation()})),this.resetErrorBag()},register:function(t){this.inputs.push(t),this.watchers.push(this.watchInput(t))},unregister:function(t){var e=this.inputs.find((function(e){return e._uid===t._uid}));if(e){var i=this.watchers.find((function(t){return t._uid===e._uid}));i&&(i.valid(),i.shouldValidate()),this.watchers=this.watchers.filter((function(t){return t._uid!==e._uid})),this.inputs=this.inputs.filter((function(t){return t._uid!==e._uid})),this.$delete(this.errorBag,e._uid)}}},render:function(t){var e=this;return t("form",{staticClass:"v-form",attrs:Object(r["a"])({novalidate:!0},this.attrs$),on:{submit:function(t){return e.$emit("submit",t)}}},this.$slots.default)}})},"9d01":function(t,e,i){},a844:function(t,e,i){"use strict";i("a9e3");var r=i("5530"),a=(i("1681"),i("8654")),s=i("58df"),o=Object(s["a"])(a["a"]);e["a"]=o.extend({name:"v-textarea",props:{autoGrow:Boolean,noResize:Boolean,rowHeight:{type:[Number,String],default:24,validator:function(t){return!isNaN(parseFloat(t))}},rows:{type:[Number,String],default:5,validator:function(t){return!isNaN(parseInt(t,10))}}},computed:{classes:function(){return Object(r["a"])({"v-textarea":!0,"v-textarea--auto-grow":this.autoGrow,"v-textarea--no-resize":this.noResizeHandle},a["a"].options.computed.classes.call(this))},noResizeHandle:function(){return this.noResize||this.autoGrow}},watch:{lazyValue:function(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)},rowHeight:function(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)}},mounted:function(){var t=this;setTimeout((function(){t.autoGrow&&t.calculateInputHeight()}),0)},methods:{calculateInputHeight:function(){var t=this.$refs.input;if(t){t.style.height="0";var e=t.scrollHeight,i=parseInt(this.rows,10)*parseFloat(this.rowHeight);t.style.height=Math.max(i,e)+"px"}},genInput:function(){var t=a["a"].options.methods.genInput.call(this);return t.tag="textarea",delete t.data.attrs.type,t.data.attrs.rows=this.rows,t},onInput:function(t){a["a"].options.methods.onInput.call(this,t),this.autoGrow&&this.calculateInputHeight()},onKeyDown:function(t){this.isFocused&&13===t.keyCode&&t.stopPropagation(),this.$emit("keydown",t)}}})},b73d:function(t,e,i){"use strict";i("0481"),i("4069");var r=i("5530"),a=(i("ec29"),i("9d01"),i("4de4"),i("45fc"),i("d3b7"),i("25f0"),i("c37a")),s=i("5607"),o=i("2b0e"),n=o["a"].extend({name:"rippleable",directives:{ripple:s["a"]},props:{ripple:{type:[Boolean,Object],default:!0}},methods:{genRipple:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.ripple?(t.staticClass="v-input--selection-controls__ripple",t.directives=t.directives||[],t.directives.push({name:"ripple",value:{center:!0}}),this.$createElement("div",t)):null}}}),l=i("8547"),c=i("58df");function u(t){t.preventDefault()}var d=Object(c["a"])(a["a"],n,l["a"]).extend({name:"selectable",model:{prop:"inputValue",event:"change"},props:{id:String,inputValue:null,falseValue:null,trueValue:null,multiple:{type:Boolean,default:null},label:String},data:function(){return{hasColor:this.inputValue,lazyValue:this.inputValue}},computed:{computedColor:function(){if(this.isActive)return this.color?this.color:this.isDark&&!this.appIsDark?"white":"primary"},isMultiple:function(){return!0===this.multiple||null===this.multiple&&Array.isArray(this.internalValue)},isActive:function(){var t=this,e=this.value,i=this.internalValue;return this.isMultiple?!!Array.isArray(i)&&i.some((function(i){return t.valueComparator(i,e)})):void 0===this.trueValue||void 0===this.falseValue?e?this.valueComparator(e,i):Boolean(i):this.valueComparator(i,this.trueValue)},isDirty:function(){return this.isActive},rippleState:function(){return this.isDisabled||this.validationState?this.validationState:void 0}},watch:{inputValue:function(t){this.lazyValue=t,this.hasColor=t}},methods:{genLabel:function(){var t=a["a"].options.methods.genLabel.call(this);return t?(t.data.on={click:u},t):t},genInput:function(t,e){return this.$createElement("input",{attrs:Object.assign({"aria-checked":this.isActive.toString(),disabled:this.isDisabled,id:this.computedId,role:t,type:t},e),domProps:{value:this.value,checked:this.isActive},on:{blur:this.onBlur,change:this.onChange,focus:this.onFocus,keydown:this.onKeydown,click:u},ref:"input"})},onBlur:function(){this.isFocused=!1},onClick:function(t){this.onChange(),this.$emit("click",t)},onChange:function(){var t=this;if(this.isInteractive){var e=this.value,i=this.internalValue;if(this.isMultiple){Array.isArray(i)||(i=[]);var r=i.length;i=i.filter((function(i){return!t.valueComparator(i,e)})),i.length===r&&i.push(e)}else i=void 0!==this.trueValue&&void 0!==this.falseValue?this.valueComparator(i,this.trueValue)?this.falseValue:this.trueValue:e?this.valueComparator(i,e)?null:e:!i;this.validate(!0,i),this.internalValue=i,this.hasColor=i}},onFocus:function(){this.isFocused=!0},onKeydown:function(t){}}}),h=i("c3f0"),p=i("0789"),v=i("490a"),f=i("80d2");e["a"]=d.extend({name:"v-switch",directives:{Touch:h["a"]},props:{inset:Boolean,loading:{type:[Boolean,String],default:!1},flat:{type:Boolean,default:!1}},computed:{classes:function(){return Object(r["a"])(Object(r["a"])({},a["a"].options.computed.classes.call(this)),{},{"v-input--selection-controls v-input--switch":!0,"v-input--switch--flat":this.flat,"v-input--switch--inset":this.inset})},attrs:function(){return{"aria-checked":String(this.isActive),"aria-disabled":String(this.isDisabled),role:"switch"}},validationState:function(){return this.hasError&&this.shouldValidate?"error":this.hasSuccess?"success":null!==this.hasColor?this.computedColor:void 0},switchData:function(){return this.setTextColor(this.loading?void 0:this.validationState,{class:this.themeClasses})}},methods:{genDefaultSlot:function(){return[this.genSwitch(),this.genLabel()]},genSwitch:function(){return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.genInput("checkbox",Object(r["a"])(Object(r["a"])({},this.attrs),this.attrs$)),this.genRipple(this.setTextColor(this.validationState,{directives:[{name:"touch",value:{left:this.onSwipeLeft,right:this.onSwipeRight}}]})),this.$createElement("div",Object(r["a"])({staticClass:"v-input--switch__track"},this.switchData)),this.$createElement("div",Object(r["a"])({staticClass:"v-input--switch__thumb"},this.switchData),[this.genProgress()])])},genProgress:function(){return this.$createElement(p["c"],{},[!1===this.loading?null:this.$slots.progress||this.$createElement(v["a"],{props:{color:!0===this.loading||""===this.loading?this.color||"primary":this.loading,size:16,width:2,indeterminate:!0}})])},onSwipeLeft:function(){this.isActive&&this.onChange()},onSwipeRight:function(){this.isActive||this.onChange()},onKeydown:function(t){(t.keyCode===f["r"].left&&this.isActive||t.keyCode===f["r"].right&&!this.isActive)&&this.onChange()}}})},e136:function(t,e,i){"use strict";i.r(e);var r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-container",[i("v-row",{attrs:{justify:"center"}},[i("v-col",{staticClass:"col-12 col-sm-8"},[i("h1",{staticClass:"text--secondary mb-3"},[t._v("Изменить товар")]),t.loading?i("div",{staticClass:"text-center my-10"},[i("v-progress-circular",{attrs:{size:70,width:7,color:"purple",indeterminate:""}})],1):i("div",[i("v-form",{ref:"form",attrs:{validation:""},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[i("v-text-field",{attrs:{label:"Название товара",name:"Название",type:"text",required:"",rules:[function(t){return!!t||"Поле обязательное"}]},model:{value:t.product.name,callback:function(e){t.$set(t.product,"name",e)},expression:"product.name"}}),i("v-text-field",{attrs:{label:"Материал",name:"Материал",type:"text",rules:[function(t){return!!t||"Поле обязательное"}]},model:{value:t.product.material,callback:function(e){t.$set(t.product,"material",e)},expression:"product.material"}}),i("v-select",{attrs:{items:t.categories,"item-text":"name","item-value":"id","menu-props":{maxHeight:"400"},label:"Категории",multiple:""},model:{value:t.product.catId,callback:function(e){t.$set(t.product,"catId",e)},expression:"product.catId"}}),i("v-row",[i("v-col",{staticClass:"col-12 col-sm-6 col-md-3"},[i("v-text-field",{attrs:{label:"Размер",name:"Размер",type:"text",rules:[function(t){return!!t||"Поле обязательное"}]},model:{value:t.product.size,callback:function(e){t.$set(t.product,"size",e)},expression:"product.size"}})],1),i("v-col",{staticClass:"col-12 col-sm-6 col-md-3"},[i("v-text-field",{attrs:{label:"Цена, грн.",name:"Цена",type:"number",rules:t.priceRules},model:{value:t.product.price,callback:function(e){t.$set(t.product,"price",t._n(e))},expression:"product.price"}})],1),i("v-col",{staticClass:"col-12 col-sm-6 col-md-3"},[i("v-text-field",{attrs:{label:"Скидка, %",name:"Скидка",type:"number",rules:[function(t){return t>=0||"Скидка должна быть не меньше 0"}],disabled:t.product.new},model:{value:t.product.discount,callback:function(e){t.$set(t.product,"discount",t._n(e))},expression:"product.discount"}})],1),i("v-col",{staticClass:"col-12 col-sm-6 col-md-3"},[i("v-switch",{staticClass:"ma-2",attrs:{label:"Новинка",disabled:t.product.discount>0},model:{value:t.product.new,callback:function(e){t.$set(t.product,"new",e)},expression:"product.new"}})],1)],1),i("v-textarea",{attrs:{name:"input-7-1",label:"Описание товара","auto-grow":!0,counter:300,rules:t.descriptionRules},model:{value:t.product.description,callback:function(e){t.$set(t.product,"description",e)},expression:"product.description"}}),i("v-switch",{staticClass:"ma-2",attrs:{label:"В наличии"},model:{value:t.product.available,callback:function(e){t.$set(t.product,"available",e)},expression:"product.available"}})],1),i("v-row",[i("v-col",[i("v-row",{attrs:{align:"center"}},[i("v-col",{staticClass:"col-12 col-md-6"},[i("v-btn",{staticClass:"warning mr-3",on:{click:function(e){return t.triggerUpload("posterInput")}}},[t._v(" Постер "),i("v-icon",{attrs:{right:"",dark:""}},[t._v("mdi-cloud-upload")])],1),i("input",{ref:"posterInput",staticStyle:{display:"none"},attrs:{type:"file",accept:"image/*"},on:{change:t.posterUpload}})],1),i("v-col",{staticClass:"col-12 col-md-6 pt-0 pt-md-3"},[i("span",[t._v("До 500 КВ")])])],1)],1),i("v-col",[t.posterSrc?i("img",{attrs:{src:t.posterSrc,height:"150"}}):i("div",{staticStyle:{color:"red"}},[t._v(t._s(t.posterError))])])],1),i("v-divider"),i("v-row",[i("v-col",{staticClass:"col-12 col-sm-6"},[i("v-row",{class:{border:t.gallerySrc.length>0},attrs:{align:"center"}},[i("v-col",{staticClass:"col-12 col-md-6"},[i("v-btn",{staticClass:"primary mr-3",on:{click:function(e){return t.triggerUpload("galleryInput")}}},[t._v(" Галерея "),i("v-icon",{attrs:{right:"",dark:""}},[t._v("mdi-cloud-upload")])],1),i("input",{ref:"galleryInput",staticStyle:{display:"none"},attrs:{type:"file",accept:"image/*",multiple:""},on:{change:t.galleryUpload}})],1),i("v-col",{staticClass:"col-12 col-md-6 pt-0 pt-md-3"},[i("span",[t._v("До 1 МВ")])]),t._l(t.gallerySrc,(function(e,r){return i("v-col",{key:r,staticClass:"col-12 col-md-6",staticStyle:{"text-align":"center"}},["Неправельный файл"===e?i("div",{staticStyle:{color:"red"}},[t._v(" "+t._s(e)+" ")]):i("div",{staticStyle:{"overflow-x":"hidden"}},[i("img",{attrs:{src:e,height:"150"}})])])}))],2)],1),i("v-col",{staticClass:"col-12 col-sm-6"},[i("v-row",{attrs:{align:"center"}},[i("v-col",{staticClass:"col-12 col-md-6"},[i("v-btn",{staticClass:"primary mr-3",on:{click:function(e){return t.triggerUpload("shopInput")}}},[t._v(" Магазин "),i("v-icon",{attrs:{right:"",dark:""}},[t._v("mdi-cloud-upload")])],1),i("input",{ref:"shopInput",staticStyle:{display:"none"},attrs:{type:"file",accept:"image/*",multiple:""},on:{change:t.shopUpload}})],1),i("v-col",{staticClass:"col-12 col-md-6 pt-0 pt-md-3"},[i("span",[t._v("До 500 КВ")])])],1),i("v-row",t._l(t.shopSrc,(function(e,r){return i("v-col",{key:r,staticClass:"col-12 col-md-6",staticStyle:{"text-align":"center"}},["Неправельный файл"===e?i("div",{staticStyle:{color:"red"}},[t._v(" "+t._s(e)+" ")]):i("div",{staticStyle:{"overflow-x":"hidden"}},[i("img",{attrs:{src:e,height:"150"}})])])})),1)],1)],1),i("v-divider"),i("v-row",[i("v-col",{staticClass:"mt-3 mb-3 d-flex justify-center"},[i("v-btn",{staticClass:"success",attrs:{disabled:!t.valid||!t.posterSrc||!t.photosValid||t.loading,loading:t.loading},on:{click:t.updateProduct}},[t._v("Обновить")])],1),i("v-col",{staticClass:"mt-3 mb-3 d-flex justify-center"},[i("v-btn",{staticClass:"warning",attrs:{disabled:t.loading,loading:t.loading},on:{click:t.clearChanges}},[t._v("Сбросить")])],1),i("v-col",{staticClass:"mt-3 mb-3 d-flex justify-center"},[i("v-btn",{staticClass:"error",attrs:{disabled:t.loading,loading:t.loading},on:{click:function(e){return t.productRemove(t.product.id)}}},[t._v("Удалить")])],1)],1)],1)])],1)],1)},a=[],s=(i("4160"),i("caad"),i("a434"),i("2532"),i("159b"),i("96cf"),i("1da1")),o={metaInfo:{title:"Product"},data:function(){return{id:this.$route.params["id"],valid:!1,posterSrc:"",posterError:"",gallerySrc:[],galleryError:!1,shopSrc:[],shopError:!1,priceRules:[function(t){return!!t||"Поле обязательное"},function(t){return t&&t>0||"Цена должна быть больше 0"}],descriptionRules:[function(t){return!!t||"Поле обязательное"},function(t){return t&&t.length<=300||"Описание должно быть не больше 300 символов"}]}},computed:{product:function(){return this.$store.getters.getProductById},loading:function(){return this.$store.getters.getLoading},categories:function(){return this.$store.getters.getCategories},photosValid:function(){return this.gallerySrc.length===this.shopSrc.length&&!this.shopError&&!this.galleryError}},methods:{triggerUpload:function(t){this.$refs[t].click()},posterUpload:function(t){var e=this;if(window.FileReader){var i=t.target.files[0];if(this.posterSrc="",this.posterError="",this.validFileType(i.type)&&i.size<=524288){var r=new FileReader;r.onload=function(){e.posterSrc=r.result},r.readAsDataURL(i),this.product.urlPoster=null,this.product.urlPoster=i}else this.posterError="Неправельный файл"}},galleryUpload:function(t){var e=this;if(window.FileReader){var i=t.target.files;this.gallerySrc=[],this.galleryError=!1,i.forEach((function(t,i){if(e.validFileType(t.type)&&t.size<=1048576){var r=new FileReader;r.onload=function(){e.gallerySrc.push(r.result)},r.readAsDataURL(t),e.product.urlGallery.splice(i,1,t)}else e.gallerySrc.push("Неправельный файл"),e.galleryError=!0}))}},shopUpload:function(t){var e=this;if(window.FileReader){var i=t.target.files;this.shopSrc=[],this.shopError=!1,i.forEach((function(t,i){if(e.validFileType(t.type)&&t.size<=524288){var r=new FileReader;r.onload=function(){e.shopSrc.push(r.result)},r.readAsDataURL(t),e.product.urlShop.splice(i,1,t)}else e.shopSrc.push("Неправельный файл"),e.shopError=!0}))}},validFileType:function(t){return t.includes("image/")},updateProduct:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.product.catId.sort((function(t,e){return t-e})),!(t.$refs.form.validate()&&t.posterSrc&&t.photosValid)){e.next=4;break}return e.next=4,t.$store.dispatch("updateProduct",t.product).then((function(){t.$router.push("/products"),t.scrollTop()})).catch((function(t){return console.log(t)}));case 4:case"end":return e.stop()}}),e)})))()},clearChanges:function(){this.$store.dispatch("productById",this.id)},productRemove:function(t){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function i(){return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return i.next=2,e.$store.dispatch("productRemove",t).then((function(){return e.$router.push("/products")})).catch((function(){}));case 2:case"end":return i.stop()}}),i)})))()},scrollTop:function(){window.scrollTo({top:0,behavior:"smooth"})}},created:function(){this.$store.dispatch("productById",this.id),this.posterSrc=this.product.urlPoster,this.gallerySrc=this.product.urlGallery,this.shopSrc=this.product.urlShop,this.scrollTop()},watch:{$route:function(t){this.id=t.params["id"]}}},n=o,l=i("2877"),c=i("6544"),u=i.n(c),d=i("8336"),h=i("62ad"),p=i("a523"),v=i("ce7e"),f=i("4bd4"),m=i("132d"),g=i("490a"),w=i("0fd9"),y=i("b974"),b=i("b73d"),C=i("8654"),S=i("a844"),x=Object(l["a"])(n,r,a,!1,null,null,null);e["default"]=x.exports;u()(x,{VBtn:d["a"],VCol:h["a"],VContainer:p["a"],VDivider:v["a"],VForm:f["a"],VIcon:m["a"],VProgressCircular:g["a"],VRow:w["a"],VSelect:y["a"],VSwitch:b["a"],VTextField:C["a"],VTextarea:S["a"]})},ec29:function(t,e,i){}}]);
//# sourceMappingURL=chunk-171c7a44.0c1f8558.js.map