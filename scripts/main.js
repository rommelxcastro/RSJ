!function(){"use strict";window.RSJ={Models:{},Collections:{},Views:{},Routers:{},Config:{apiUrl:"http://risingsunjeans.com/api"},init:function(){return new RSJ.Views.AppView}},$(document).ready(function(){RSJ.init()})}(),this.JST=this.JST||{},this.JST["app/scripts/templates/Home.ejs"]=function(obj){obj||(obj={});var __t,__p="";with(_.escape,Array.prototype.join,obj){__p+='<section id="home" class="large-12 column">\n	<div class="row">\n		';for(var i=0;1>i;i++)__p+='\n			<figure class="large-12 columns">\n				<a href="'+(null==(__t=large[i].url)?"":__t)+'" title="'+(null==(__t=large[i].title)?"":__t)+'"><img width="886" src="'+(null==(__t=large[i].img)?"":__t)+'" alt="'+(null==(__t=large[i].title)?"":__t)+'"></a>\n			</figure>\n		';__p+='\n	</div>\n	<div class="row">\n		';for(var s=0;2>s;s++)__p+='\n			<figure class="large-6 columns">\n				<a href="'+(null==(__t=small[i].url)?"":__t)+'" title="'+(null==(__t=small[i].title)?"":__t)+'"><img src="'+(null==(__t=small[i].img)?"":__t)+'" alt="'+(null==(__t=small[i].title)?"":__t)+'"></a>\n			</figure>\n		';__p+="\n	</div>\n</section>"}return __p},this.JST["app/scripts/templates/Stockist.ejs"]=function(obj){obj||(obj={});var __t,__p="";with(_.escape,obj)__p+='<li class="large-4 columns">\n<strong>'+(null==(__t=title)?"":__t)+"</strong>\n<address>"+(null==(__t=address)?"":__t)+"</address>\n</li>";return __p},this.JST["app/scripts/templates/Stockists.ejs"]=function(obj){obj||(obj={});var __t,__p="";with(_.escape,Array.prototype.join,obj){var regions=obj;__p+="\n";for(var i=0;i<regions.length;i++)__p+='\n<details class="large-12 columns" data-rsj-stockist-region="'+(null==(__t=regions[i])?"":__t)+'">\n	<summary>'+(null==(__t=regions[i])?"":__t)+'</summary>\n	<ul class="row"></ul>\n</details>\n'}return __p},function(){"use strict";RSJ.Models.PageModel=Backbone.Model.extend({})}(),function(){"use strict";RSJ.Models.PostModel=Backbone.Model.extend({})}(),function(){"use strict";RSJ.Collections.PagesCollection=Backbone.Collection.extend({model:RSJ.Models.PageModel,url:RSJ.Config.apiUrl+"/get_page/"})}(),function(){"use strict";RSJ.Collections.PostsCollection=Backbone.Collection.extend({model:RSJ.Models.PostModel,url:RSJ.Config.apiUrl+"/get_posts/",parse:function(a){return a.posts}})}(),function(){"use strict";RSJ.Views.AppView=Backbone.View.extend({el:"body",initialize:function(){new RSJ.Routers.AppRouter,Backbone.history.start({pushState:!1,root:"/"})}})}(),function(){"use strict";RSJ.Views.HomeView=Backbone.View.extend({template:JST["app/scripts/templates/Home.ejs"],el:"main",initialize:function(){_.bindAll(this),this.render()},render:function(){return this.$el.html(this.template(this.serialize())),this},serialize:function(){var a=[],b=[];return _.each(this.collection.models,function(c){var d={img:c.attributes.attachments[0].url,title:c.attributes.title,url:c.attributes.custom_fields["wpcf-slide-url"][0],isMain:1===parseFloat(c.attributes.custom_fields["wpcf-main-picture"][0])?!0:!1};d.isMain===!0?b.push(d):d.isMain===!1&&a.push(d)}),{small:a,large:b}}})}(),function(){"use strict";RSJ.Views.StockistView=Backbone.View.extend({template:JST["app/scripts/templates/Stockist.ejs"],tagName:"li",initialize:function(){_.bindAll(this),this.render()},render:function(){return this.$el.append(this.template(this.serialize())),this},serialize:function(){var a={title:this.model.attributes.title,address:this.model.attributes.custom_fields["wpcf-address"][0]};return a}})}(),function(){"use strict";RSJ.Views.StockistsView=Backbone.View.extend({el:"main",template:JST["app/scripts/templates/Stockists.ejs"],initialize:function(){_.bindAll(this),this._extractRegions()},_extractRegions:function(){var a=[];_.filter(this.collection.models,function(b){var c=b.get("taxonomy_region")[0].title;a.indexOf(c)<0&&a.push(c)}),this.render(a)},render:function(a){return this.$el.html(this.template(a)),_.each(this.collection.models,function(a){new RSJ.Views.StockistView({model:a,el:'[data-rsj-stockist-region="'+a.attributes.taxonomy_region[0].title+'"] ul'})}),this}})}(),function(){"use strict";RSJ.Routers.AppRouter=Backbone.Router.extend({routes:{"":"pageHome",stockist:"pageStockist",":slug":"page"},initialize:function(){},pageHome:function(){this.postsCollection||(this.postsCollection=new RSJ.Collections.PostsCollection),this.postsCollection.fetch({data:{post_type:"slide"},success:function(a){new RSJ.Views.HomeView({collection:a})},error:function(a,b){console.log(b)}})},pageStockist:function(){this.postsCollection||(this.postsCollection=new RSJ.Collections.PostsCollection),this.postsCollection.fetch({data:{post_type:"stock"},success:function(a){new RSJ.Views.StockistsView({collection:a})},error:function(a,b){console.log(b)}})},page:function(a){this.pagesCollection||(this.pagesCollection=new RSJ.Collections.PagesCollection),this.pagesCollection.fetch({data:{slug:a}})}})}();