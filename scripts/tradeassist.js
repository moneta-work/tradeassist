(function(){var t,e,i,s,n,r,a,o={}.hasOwnProperty,c=function(t,e){function i(){this.constructor=t}for(var s in e)o.call(e,s)&&(t[s]=e[s]);return i.prototype=e.prototype,t.prototype=new i,t.__super__=e.prototype,t};$(document).ready(function(){var e;return e=new t,e.addCardInterface($("#left")),e.addCardInterface($("#right"))}),e=function(){function t(){}return t.prototype.defaultImg="images/spacer.gif",t.prototype.regularImageUrl="http://gatherer.wizards.com/Handlers/Image.ashx?",t.prototype.customImageUrl="http://tcgimages.eu/img/cards/",t.prototype.url="bridge.php",t.prototype.events={},t.prototype.test="",t.prototype.tradeAssist=null,t.prototype.addEvent=function(t,e){return null!=t&&null!=e&&(this.events[t]=this.events[t]||[],this.events[t].push(e)),this},t.prototype.removeEvents=function(t){return this.events[t]=[],this},t.prototype.fireEvent=function(t,e){var i,s,n,r;if(null!=this.events[t])for(r=this.events[t],s=0,n=r.length;n>s;s++)i=r[s],i.apply(this,e);return this},t}(),t=function(t){function e(){var t=this;this.region="eu",null!=(navigator.language||navigator.userLanguage||"").match(RegExp("^en-us","i"))&&(this.region="us"),$("body").addClass("region-"+this.region),""!==window.location.hash&&this.loadLists(window.location.hash.substr(1)),$("#controlicons").length&&($("#controlicons .save").on("click",function(){return t.saveLists()}),$("#controlicons .price").on("click",function(){return t.togglePrices()}),$("#controlicons .region").on("click",function(){return t.toggleRegion()})),$("#container > div").on("click",".counter",function(){return $(this).closest(".inactive").removeClass("inactive").siblings("div").addClass("inactive")}),this.popup=$("#popup").on("click",".window",function(){return $(this).stop().fadeOut(function(){return $(this).remove()})}).find(".window"),this.isMobile="block"===$("#left").css("display")}return c(e,t),e.prototype.cardInterfaces=[],e.prototype.requestRunning=!1,e.prototype.isMobile=!1,e.prototype.isMinimum=!1,e.prototype.addCardInterface=function(t){return this.cardInterfaces.push(new s(t,this))},e.prototype.saveLists=function(){var t,e,i,s,n,r,a=this;for(i=[],r=this.cardInterfaces,e=s=0,n=r.length;n>s;e=++s)t=r[e],i[e]=t.cardlist.exportToObject();return this.requestRunning?void 0:(this.requestRunning=!0,$.post(this.url,{action:"export",arg:JSON.stringify(i)},function(t){var e;return t&&(window.location.hash=t,e=window.location.toString(),a.showPopup("List saved",'List has been saved and can be shared with this URL:<br/><a href="'+e+'">'+e+"</a>")),a.requestRunning=!1}))},e.prototype.loadLists=function(t){var e=this;return this.requestRunning?void 0:(this.requestRunning=!0,$.getJSON(this.url,{action:"import",arg:t},function(t){return null!=t&&$.each(t,function(t,i){var s;return null!=(s=e.cardInterfaces[t])?s.cardlist.reset().importFromObject(i):void 0}),e.requestRunning=!1}))},e.prototype.togglePrices=function(){var t,e,i,s;for(this.isMinimum=!this.isMinimum,$("body").toggleClass("price-min",this.isMinimum),s=this.cardInterfaces,e=0,i=s.length;i>e;e++)t=s[e],t.cardlist.updatePrices();return this.showPopup("Switched Prices","The cards are now compared by <em>"+(this.isMinimum?"minimum":"average")+" prices</em>")},e.prototype.toggleRegion=function(){var t,e,i,s;for($("body").removeClass("region-"+this.region),this.region="us"===this.region?"eu":"us",$("body").addClass("region-"+this.region),s=this.cardInterfaces,e=0,i=s.length;i>e;e++)t=s[e],t.cardlist.reset();return this.showPopup("Switched Region","Changed the price region to <em>"+this.region.toUpperCase()+"</em>")},e.prototype.showPopup=function(t,e){return this.popup.clone().find("h1").text(t).end().find("p").html(e).end().appendTo("#popup").slideDown().delay(2500).fadeOut(function(){return $(this).remove()})},e}(e),i=function(t){function e(t,i){var s,n,r,a;if(this.tradeAssist=i,$.isArray(t)){for(s=r=0,a=t.length;a>r;s=++r)n=t[s],t[s]=new e(n,this.tradeAssist);return t}return this.name={en:t.name||"",de:t.name_de||""},this.printings=t.printings,this.rates={normal:t.rate||-1,foil:t.rate_foil||-1,min:t.minprice||-1,min_foil:t.minprice_foil||-1,date:"",special:""},this.count=t.count||1,this.isFoil=t.foil||!1,this.isMinimum=this.tradeAssist.isMinimum,this.events={},this}return c(e,t),e.prototype.getName=function(t){return null==t&&(t="en"),this.name[t]},e.prototype.getId=function(){return this.printings[0].id},e.prototype.getRarity=function(){return this.printings[0].rarity},e.prototype.getCount=function(){return this.count},e.prototype.setCount=function(t){var e;if(t=Math.max(0,t),t!==this.count){if(e=t-this.count,this.count=t,this.getRate()>=0)return this.fireEvent("valuechange",[e*this.getRate()]);if(0===t)return this.fireEvent("valuechange",[0])}},e.prototype.getIsFoil=function(){return this.isFoil},e.prototype.setIsFoil=function(t){var e;return t!==this.isFoil&&(e=this.getRate(),this.isFoil=t,e>=0&&this.getRate()>=0)?this.fireEvent("valuechange",[this.getCount()*(this.getRate()-e)]):void 0},e.prototype.updateRate=function(){var t;return this.isMinimum!==this.tradeAssist.isMinimum&&(t=this.getRate(),this.isMinimum=this.tradeAssist.isMinimum,t>=0&&this.getRate()>=0)?this.fireEvent("valuechange",[this.getCount()*(this.getRate()-t)]):void 0},e.prototype.getSpecial=function(){return this.rates.special},e.prototype.getImage=function(){var t;return t=this.defaultImg,""===this.printings[0].img?(t=this.regularImageUrl+"type=card&size=small&set=",t+=this.getEdition(!0)+"&name=",t+=encodeURIComponent(this.getName().replace(RegExp(" \\(.*?\\)","g"),""))):t=this.customImageUrl+this.printings[0].img,t},e.prototype.getEdition=function(t){return null==t&&(t=!1),t?this.printings[0].ed:this.printings[0].edition},e.prototype.getEditionImage=function(t){return null==t&&(t=!1),"images/editions/"+(t||this.getEdition(!0))+".png"},e.prototype.getEditions=function(){var t,e,i,s,n;for(t=[],n=this.printings,i=0,s=n.length;s>i;i++)e=n[i],t.push({"short":e.ed,"long":e.edition,src:this.getEditionImage(e.ed)});return t},e.prototype.setEdition=function(t){var e,i,s,n,r,a;if(i=0,""!==this.rates.date&&(this.printings[0].rates=this.rates,i=this.getRate()),"string"!=typeof t)t?this.printings.push(this.printings.shift()):this.printings.unshift(this.printings.pop());else for(a=this.printings,e=n=0,r=a.length;r>n;e=++n)s=a[e],s.ed===t&&this.printings.unshift(this.printings.splice(e,1)[0]);return null==this.printings[0].rates?(this.rates={normal:-1,foil:-1,min:-1,min_foil:-1,date:"",special:""},this.fireEvent("valuechange",[this.getCount()*-i])):(this.rates=this.printings[0].rates,"nofoil"===this.rates.special&&(this.isFoil=!1),"onlyfoil"===this.rates.special&&(this.isFoil=!0),this.getRate()>=0?this.fireEvent("valuechange",[this.getCount()*(this.getRate()-i)]):void 0)},e.prototype.getRate=function(){var t,e=this;return""===this.rates.date?(this.rates.special!==this.getId()&&(t=this.getId(),this.rates.special=t,$.getJSON(this.url,{action:"value",arg:t,region:this.tradeAssist.region},function(i){return i.error||e.getId()!==t?(e.tradeAssist.showPopup("Error loading price",i.error),e.rates.normal=0,e.rates.foil=0,e.rates.min=0,e.rates.min_foil=0,e.rates.date=(new Date).getTime(),e.fireEvent("valuechange",[0])):(e.rates.normal=parseFloat(i.rate),e.rates.foil=parseFloat(i.rate_foil),e.rates.min=parseFloat(i.minprice),e.rates.min_foil=parseFloat(i.minprice_foil),e.rates.date=i.timestamp,e.rates.foil>0&&0===e.rates.normal?(e.rates.special="onlyfoil",e.isFoil=!0):0===e.rates.foil?(e.rates.special="nofoil",e.isFoil=!1):e.rates.special="",e.fireEvent("valuechange",[e.getRate()*e.getCount()]))})),-1):this.getIsFoil()?this.isMinimum?this.rates.min_foil:this.rates.foil:this.isMinimum?this.rates.min:this.rates.normal},e.prototype.getRateTimestamp=function(){return this.rates.date||null},e.prototype.getMKMLink=function(){return"http://www.magiccardmarket.eu/CardPage.c1p"+this.getId()+".prod?referrer=bra1n"},e.prototype.clone=function(){var t,i,s,n,r;for(t=new e({},this.tradeAssist),i=["name","printings","rates","count","isFoil","isMinimum"],n=0,r=i.length;r>n;n++)s=i[n],t[s]=this[s];return t},e}(e),s=function(t){function e(t,e){var i=this;this.tradeAssist=e,this.sideContainer=$(t),this.input=this.sideContainer.find(".input_cardname"),this.difference=this.sideContainer.find(".difference"),this.lastSuggest="",this.counter=new a(this.sideContainer.find(".currentvalue"),this.tradeAssist),this.counter.addEvent("difference",function(t,e){return i.differenceTimer&&window.clearTimeout(i.differenceTimer),i.differenceTimer=window.setTimeout(function(){return i.updateDifference(t,e)},250)}),this.tradeAssist.isMobile&&(this.input.on("focus",function(){return $("#controlpanel").hide()}),this.input.on("blur",function(){return $("#controlpanel").show()})),this.cardlist=new n(this.sideContainer.find(".cardlist_container"),this.tradeAssist),this.cardlist.addEvent("valuechange",function(t){return i.counter.add(t)}),this.suggestions=new r(this.input,this.tradeAssist),this.suggestions.addEvent("click",function(t){return i.cardlist.addCard(t.clone()),i.suggestions.hide(),i.tradeAssist.isMobile||i.input.val("").focus(),i.lastSuggest=""}),this.input.on({keyup:function(t){return i.inputKeyEvent(t.which)}})}return c(e,t),e.prototype.inputKeyEvent=function(t){var e=this;switch(t){case 13:if(this.suggestions.isUp())return this.suggestions.fire(),this.input.val(""),this.lastSuggest="";if(""!==this.input.val())return this.lastSuggest=this.input.val(),this.suggestions.suggest(this.input.val());break;case 37:return this.suggestions.left();case 38:return this.suggestions.up();case 39:return this.suggestions.right();case 40:return this.suggestions.down();default:return this.suggestTimer&&window.clearTimeout(this.suggestTimer),this.suggestTimer=window.setTimeout(function(){return e.input.val()!==e.lastSuggest?(e.lastSuggest=e.input.val(),e.suggestions.suggest(e.lastSuggest)):e.suggestions.isUp()?void 0:e.suggestions.show()},250)}},e.prototype.updateDifference=function(t,e){var s,n,r,a,o,c,u,l,h,d,p,g=this;if(Math.abs(.5-e)>.05&&!this.counter.isMax()&&t>0){for(n=[],h=this.tradeAssist.cardInterfaces,o=0,u=h.length;u>o;o++)if(a=h[o],a.counter.isMax())for(d=a.cardlist.exportToObject().cards,c=0,l=d.length;l>c;c++)s=d[c],n.push(s.id);return this.difference.addClass("show").find("span").text(t.toFixed(2).replace(/\./,",")),this.difference.find(".slider").css("width",100-100*e+"%"),r=this.difference.find(".propose").off("click"),null!=this.xhr&&4!==this.xhr.readyState&&this.xhr.abort(),this.xhr=$.getJSON(this.url,{action:"propose",arg:parseFloat(t).toFixed(2),exclude:n.join(","),minprice:this.tradeAssist.isMinimum,region:this.tradeAssist.region},function(t){return t?(s=new i(t,g.tradeAssist),r.find("a").text(s.getName()+" ("+s.getEdition(!0)+")"),r.on("click","a",function(){return g.tradeAssist.isMobile&&g.sideContainer.removeClass("inactive").siblings("div").addClass("inactive"),g.cardlist.addCard(s),r.off("click"),!1}),r.show()):r.hide()})}return null!=(p=this.xhr)&&p.abort(),this.difference.removeClass("show").find(".propose").off("click")},e}(e),n=function(t){function e(t,e){var i,s=this;this.tradeAssist=e,this.cards=[],this.events={},i=this,this.sortElements=$('<div class="sort"><div class="title">sort by</div></div>'),this.sortElements.prepend($('<div class="name active down">name</div>').on("click",function(){return $(this).is(".active")||$(this).siblings(".active").removeClass("active").removeClass("down"),i.sort("name",$(this).addClass("active").toggleClass("down").hasClass("down"))})),this.sortElements.prepend($('<div class="rarity">rarity</div>').on("click",function(){return $(this).is(".active")||$(this).siblings(".active").removeClass("active").removeClass("down"),i.sort("rarity",$(this).addClass("active").toggleClass("down").hasClass("down"))})),this.sortElements.prepend($('<div class="rate">price</div>').on("click",function(){return $(this).is(".active")||$(this).siblings(".active").removeClass("active").removeClass("down"),i.sort("rate",$(this).addClass("active").toggleClass("down").hasClass("down"))})),this.sortElements.prepend($('<div class="reset">X</div>').on("click",function(){return s.reset()})),this.sortElements.prepend($('<div class="cards"><strong>0</strong> cards</div>')),this.cardlist=$('<ul class="cardlist"></ul>'),$(t).append(this.sortElements).append(this.cardlist)}return c(e,t),e.prototype.addCard=function(t){var e,i=this;return null!=t?(e=this.generateCardTemplate(t),this.cardlist.append(e),this.cards.push(e.slideDown()),t.removeEvents("valuechange").addEvent("valuechange",function(t){return i.handleValueChange(e,t)}),this.sort(this.sortElements.find(".active").text(),this.sortElements.find(".active").hasClass("down")),this.updateCounter()):void 0},e.prototype.sort=function(t,e){var i;switch(e=e&&1||-1,t){case"name":i=function(t,i){return $(t).data("card").getName().toLowerCase()>$(i).data("card").getName().toLowerCase()?e:-1*e};break;case"edition":i=function(t,i){return $(t).data("card").getEdition(!1)>$(i).data("card").getEdition(!1)?e:-1*e};break;case"rarity":i=function(t,i){var s;return s=["t","c","u","r","m","s"],s.indexOf($(t).data("card").getRarity())<s.indexOf($(i).data("card").getRarity())?e:-1*e};break;case"rate":case"price":i=function(t,i){return $(t).data("card").getRate()<$(i).data("card").getRate()?e:-1*e};break;default:i=function(){return 0}}return this.cardlist.find("li.card").length>0?this.cardlist.append(this.cardlist.find("li.card").sort(i)):void 0},e.prototype.reset=function(){var t,e,i,s,n,r;for(i=0,r=this.cards,s=0,n=r.length;n>s;s++)e=r[s],t=e.data("card"),t.removeEvents("valuechange"),i-=Math.max(0,t.getRate())*t.getCount(),e.slideUp(200,function(){return $(this).remove()});return this.fireEvent("valuechange",[i]),this.cards=[],this.updateCounter()},e.prototype.updateCounter=function(){var t,e,i,s,n;for(e=0,n=this.cards,i=0,s=n.length;s>i;i++)t=n[i],e+=t.data("card").getCount();return this.sortElements.find(".cards").html("<strong>"+e+"</strong> card"+(1===e?"":"s")),e&&this.sortElements.slideDown(),e||this.sortElements.slideUp(),this},e.prototype.exportToObject=function(){var t,e,i,s,n;for(e={cards:[]},n=this.cards,i=0,s=n.length;s>i;i++)t=n[i],e.cards.push({id:t.data("card").getId(),count:t.data("card").getCount(),foil:t.data("card").getIsFoil()});return e},e.prototype.importFromObject=function(t){var e,s,n,r;if(t.cards){for(r=t.cards,s=0,n=r.length;n>s;s++)e=r[s],this.addCard(new i(e,this.tradeAssist));return this.sort(this.sortElements.find(".active").text(),this.sortElements.find(".active").hasClass("down"))}},e.prototype.updatePrices=function(){var t,e,i,s,n;for(s=this.cards,n=[],e=0,i=s.length;i>e;e++)t=s[e],n.push(t.data("card").updateRate());return n},e.prototype.generateCardTemplate=function(t){var e,i,s;return s=this,e=$('<li class="card"></li>'),i=$('<div class="right"></div>'),i.append('<span class="count">'+t.getCount()+'x</span><span class="rate currency'+(t.getIsFoil()?" foil":"")+'"></span>'),i.append($('<button class="plus">+</button>').on("click",function(){return t.setCount(t.getCount()+1)})),i.append('<img class="rarity '+t.getRarity()+'" src="'+this.defaultImg+'" alt=""/><br/>'),i.append($('<img class="edition" alt="'+t.getEdition(!0)+'" title="'+t.getEdition(!1)+'" src="'+t.getEditionImage()+'"/>').on("click",function(){var s,n,r,a,o,c;if(t.getEditions().length>1){for(n=$('<div class="editions"></div>'),c=t.getEditions(),r=function(s){return n.prepend($('<img class="edition choice"/>').attr({alt:s.short,src:s.src,title:s.long}).on("click",function(){return n.remove(),t.setEdition(s.short),i.find(".edition").attr({alt:t.getEdition(!0),title:t.getEdition(!1),src:t.getEditionImage()}).show(),i.find(".rarity").attr("class","rarity "+t.getRarity()),e.find(".thumbnail").attr("src",t.getImage()).parent("a").attr("href",t.getMKMLink())}))},a=0,o=c.length;o>a;a++)s=c[a],r(s);return $(this).hide().after(n)}}).toggleClass("multiple",t.getEditions().length>1)),i.append($('<div class="checkbox foil" title="Normal / Foil"></div>').toggleClass("checked",t.getIsFoil()).on("click",function(){return $(this).hasClass("locked")?void 0:t.setIsFoil($(this).toggleClass("checked").hasClass("checked"))})),i.append($('<button class="minus">&ndash;</button>').on("click",function(){return t.setCount(t.getCount()-1)})),i.append('<img class="rarity '+t.getRarity()+'" src="'+this.defaultImg+'"/>'),e.append(i),e.append($('<a href="'+t.getMKMLink()+'" target="_blank"><img class="thumbnail" alt="'+t.getName()+'" title="'+t.getName()+'" src="'+t.getImage()+'"/></a>').on({mouseenter:function(){var t;if(!s.tradeAssist.isMobile)return t=$(this).find(".thumbnail"),$("#fullcard").stop().remove(),t.clone().attr("id","fullcard").css(t.offset()).css({left:t.offset().left-250,top:t.offset().top-100,display:"none"}).appendTo("body").fadeIn()},mouseleave:function(){return $("#fullcard").stop().fadeOut(500,function(){return $(this).remove()})}})),e.append('<div class="name">'+t.getName("en")+"</div>").data("card",t),t.getRate()>=0?this.handleValueChange(e,t.getRate()):i.find("span.rate").addClass("loader"),e},e.prototype.handleValueChange=function(t,e){var i,s,n,r,a,o;if(i=t.data("card"),0===i.getCount()){for(o=this.cards,s=r=0,a=o.length;a>r;s=++r)n=o[s],n===t&&this.cards.splice(s,1);t.slideUp(500,function(){return $(this).remove()})}else switch(i.getRate()<0?t.find("span.rate").addClass("loader").text("").attr("title",i.getRateTimestamp()):t.find("span.rate").removeClass("loader").text(i.getRate().toFixed(2).replace(/\./,",")).attr("title",i.getRateTimestamp()),t.find("span.rate").toggleClass("foil",i.getIsFoil()),t.find("span.count").text(i.getCount()+"x"),i.getSpecial()){case"onlyfoil":t.find(".name").addClass("foil"),t.find(".checkbox.foil").addClass("checked locked").attr("title","");break;case"nofoil":t.find(".name").removeClass("foil"),t.find(".checkbox.foil").addClass("locked").removeClass("checked");break;default:t.find(".name").toggleClass("foil",i.getIsFoil()),t.find(".checkbox.foil").removeClass("locked").toggleClass("checked",i.getIsFoil())}return this.updateCounter(),"price"===this.sortElements.find(".active").text()&&this.sort("rate",this.sortElements.find(".active").hasClass("down")),this.fireEvent("valuechange",[e])},e}(e),r=function(t){function e(t,e){this.tradeAssist=e,this.inputElement=$(t),this.container=$('<ul class="suggestions"></ul>'),this.events={}}return c(e,t),e.prototype.suggest=function(t){var e,s,n=this;return""!==t?(4!==(null!=(e=this.xhr)?e.readyState:void 0)&&null!=(s=this.xhr)&&s.abort(),this.xhr=$.getJSON(this.url,{action:"suggest",arg:t},function(e){return t===n.lastSuggest?(null!=e?e.cards.length:void 0)>0?n.show(new i(e.cards,n.tradeAssist)):n.hide():void 0}),this.lastSuggest=t):this.hide()},e.prototype.show=function(t){var e,i,s,n,r,a,o,c,u,l,h=this;if(t)for(this.container.empty(),c=function(t,e){return t.on({click:function(){return h.fireEvent("click",[e])},mouseenter:function(){return t.is(".active")?void 0:($("li.active",h.container).removeClass("active"),t.addClass("active"))}})},s=u=0,l=t.length;l>u;s=++u)e=t[s],n=$('<li class="suggestion'+(s?"":" active")+'"></li>').data("card",e),r="",i="",a=this.escapeRegExp(this.lastSuggest),!this.lastSuggest||new RegExp(a,"i").test(e.getName())?i=e.getName().replace(new RegExp("("+a+")","i"),"<em>$1</em>"):(i=e.getName("de").replace(new RegExp("("+a+")","i"),"<em>$1</em>"),r=e.getName()),n.append($("<span class='name'>"+i+"</span>")),""!==r&&n.append($("<span class='name_real'>("+r+")</span>")),n.append($("<img class='thumbnail'/>").attr({src:e.getImage(),title:e.getName(),alt:e.getName()})),n.prepend($("<img class='edition'/>").attr({src:e.getEditionImage(),title:e.getEdition(),alt:e.getEdition(!0)})),e.getEditions().length>1&&!function(t){return t.prepend($('<div class="arrow left">&larr;</div>').on("click",function(e){return e.stopPropagation(),h.left(t)})),t.prepend($('<div class="arrow right">&rarr;</div>').on("click",function(e){return e.stopPropagation(),h.right(t)}))}(n),c(n,e),this.container.append(n);return!this.isUp()&&$("li.suggestion",this.container).length&&(this.inputElement.parent(".input").after(this.container),o=$(window),o.height()+o.scrollTop()<this.container.offset().top+this.container.outerHeight())?$("body").animate({scrollTop:this.inputElement.offset().top}):void 0},e.prototype.hide=function(){return this.isUp()?this.inputElement.parent(".input").next(".suggestions").detach():void 0},e.prototype.isUp=function(){return this.inputElement.parent(".input").next(".suggestions").length>0},e.prototype.fire=function(){return this.hide(),$("li.active",this.container).trigger("click")},e.prototype.down=function(){var t;if(!this.isUp())return this.show();if(!($("li.suggestion",this.container).length<=1))return t=$("li.active",this.container).removeClass("active"),0===t.next("li.suggestion").addClass("active").length?$("li.suggestion:first",this.container).addClass("active"):void 0},e.prototype.up=function(){var t;if(!this.isUp())return this.show();if(!($("li.suggestion",this.container).length<=1))return t=$("li.active",this.container).removeClass("active"),0===t.prev("li.suggestion").addClass("active").length?$("li.suggestion:last",this.container).addClass("active"):void 0},e.prototype.changeEdition=function(t,e){var i;return this.isUp()&&(null==t&&(t=$("li.active",this.container)),i=t.data("card"),i.getEditions().length>1)?(i.setEdition(e),this.tradeAssist.isMobile||$(".thumbnail",t).attr("src",i.getImage()),$(".edition",t).attr({alt:i.getEdition(!0),title:i.getEdition(),src:i.getEditionImage()})):void 0},e.prototype.left=function(t){return this.changeEdition(t,!1)},e.prototype.right=function(t){return this.changeEdition(t,!0)},e.prototype.escapeRegExp=function(t){return t.replace(/[-[\]{}()*+?.\\^$|,#\s]/g,function(t){return"\\"+t})},e}(e),a=function(t){function e(t,e){this.tradeAssist=e,this.counter=$(t).text("0,00"),this.currentValue=0,this.interval=0,this.animationDuration=500,this.fontGrowth=10,this.fontSize=30,this.frameRate=1e3/60,this.tradeAssist.isMobile&&(this.animationDuration=200,this.frameRate=50),this.events={}}return c(e,t),e.prototype.add=function(t){return t=parseFloat(t),0!==t&&(this.stepsize=(this.currentValue-parseFloat(this.counter.text().replace(/,/,"."))+t)/(60*this.animationDuration/1e3),Math.abs(this.stepsize)<.01&&(this.stepsize=.01*(this.stepsize>0?1:-1)),this.currentValue=parseFloat(this.currentValue.toFixed(2))+parseFloat(t.toFixed(2)),this.interval||this.incrementCounter()),this.tradeAssist.cardInterfaces.length>1?this.rebalance():void 0},e.prototype.incrementCounter=function(){return Math.abs(this.currentValue-parseFloat(this.counter.text().replace(/,/,".")))>Math.abs(this.stepsize)?(this.counter.text((parseFloat(this.counter.text().replace(/,/,"."))+this.stepsize).toFixed(2).replace(/\./,",")),this.interval=window.setTimeout(this.incrementCounter.bind(this),this.frameRate)):(this.counter.text(this.currentValue.toFixed(2).replace(/\./,",")),this.interval=0)},e.prototype.reset=function(){return this.add(-1*this.currentValue)},e.prototype.rebalance=function(){var t,e,i,s,n,r,a,o,c,u,l,h;for(n=null,s=null,u=this.tradeAssist.cardInterfaces,r=0,o=u.length;o>r;r++)t=u[r],e=t.counter,null==s&&(s=e.currentValue),null==n&&(n=e.currentValue),e.currentValue<n&&(n=e.currentValue),e.currentValue>s&&(s=e.currentValue);for(i=0===n?1:Math.abs(Math.min(s/n-1,1)),l=this.tradeAssist.cardInterfaces,h=[],a=0,c=l.length;c>a;a++)t=l[a],e=t.counter,e.currentValue>(s+n)/2?e.counter.stop().animate({color:"rgb("+(255-Math.round(255*i*(2*e.currentValue-s-n)/(s-n)))+","+255+","+(255-Math.round(255*i*(2*e.currentValue-s-n)/(s-n)))+")",fontSize:Math.round(i*this.fontGrowth*(2*e.currentValue-s-n)/(s-n))+this.fontSize}):e.currentValue<(s+n)/2?e.counter.stop().animate({color:"rgb(255,"+(255-Math.round(255*i*(s+n-2*e.currentValue)/(s-n)))+","+(255-Math.round(255*i*(s+n-2*e.currentValue)/(s-n)))+")",fontSize:Math.round(i*this.fontGrowth*(2*e.currentValue-s-n)/(s-n))+this.fontSize}):e.counter.stop().animate({color:"rgb(255,255,255)",fontSize:this.fontSize}),h.push(e.fireEvent("difference",[s-n,n/(s+n)]));return h},e.prototype.isMax=function(){var t,e,i,s,n,r;for(i=null,r=this.tradeAssist.cardInterfaces,s=0,n=r.length;n>s;s++)t=r[s],e=t.counter,null==i&&(i=e.currentValue),e.currentValue>i&&(i=e.currentValue);return this.currentValue===i},e}(e)}).call(this);