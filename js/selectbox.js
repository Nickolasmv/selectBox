var _selectboxid =0;
var	SelectBox =(function() { return function() {
 		this.items =arguments[0];
 		this.htmlcontent = createHtml(this.items);
		this.selectboxid = _selectboxid;
		_selectboxid++;
 		this.closeDrop = function(e){
			if (! e) e = window.event;
				var tg = (e.target) ? e.target : e.srcElement;		
				if(tg){
				 var id =tg.parentNode ? tg.parentNode.id : "";
					if(id!="main_content"&&id!="box_warper"){
						var elements = getElByCl("main_content",this.sb);					
 						for (var el in elements ){ 						
 							if(elements[el].style)
 						elements[el].style.height ='0px';				
 						}						
					}
				}	
			};
		addEvent(window.document, 'click',function(e) { return that.closeDrop(e)});
 		addEvent(window, 'blur',function(e) { return that.closeDrop(e)});
		
		
 			//add child to node 
 		this.appendTo = function(node){
 			if(node){			
			if(node.id)	{
				this.nodeid =this.nodeid=node.id
			} else
				{
					this.nodeid = this.nodeid=node.id = "selectbox"+this.items.length.toString();
				}
				var o = document.createElement('div');
				o.className = "selectBox";
				o.id = "selectBox"+this.selectboxid;
				o.innerHTML=this.htmlcontent;		
				if(document.getElementById(o.id))
				node.replaceChild(o,document.getElementById(o.id));
				else
				node.appendChild(o);
				this.sb= o;
				this.selectById(this.items[0].id);
				this.button = getElByCl("selectArrow",o)[0];
				this.selected = getElByCl("selected",o)[0];
				this.node = node;
								
					 // add scrollbar 
				this.selectOptionsnode = getElByCl("selectOptions",o)[0];
				if(	this.selectOptionsnode.scrollHeight>300){
				this.mainHeight =  this.mainHeight ? this.mainHeight : '300';
				bar.scrollbar(getElByCl("main_content",o)[0],this.mainHeight,this.selectboxid);
				}
				else	{
						this.mainHeight =  this.mainHeight ? this.mainHeight : getElByCl("main_content",o)[0].	scrollHeight;
						this.selectOptionsnode.style.marginRight= "0px";
						this.selectOptionsnode.style.paddingRight= "16px";
						this.sb.style.paddingRight = "16px";
				}
				getElByCl("main_content",o)[0].style.height ="0px";
				
				//adding elements  events handlers
				this.enable(1);
				};
 		};
 		
 		//event for drop down
		this.dropdown = function(){
 				var visible =  getElByCl("main_content",this.sb)[0].style.height;
 				var el = getElByCl("main_content",this.sb);
 				var el_g = getElByCl("main_content",document);
				for (var k in el_g ){
 						if(el_g[k].style)
							el_g[k].style.height ='0px';
 						}
				for (var e in el ){
 						if(el[e].style)
							el[e].style.height = (visible=='0px') ? this.mainHeight+'px' :'0px';
 						}
		};
			
		//return all items
		this.getItems = function(){
			return this.items;
		};
		this.clickItem = function(e){
						if (! e) e = window.event;
				var tg = (e.target) ? e.target : e.srcElement;
					if(tg.className=="selectOption"){
						 selected = getElByCl("selected_opt",tg.parentNode)[0];		
					    if(selected)		selected.className =  'selectOption';
						tg.className = (tg.className.indexOf('selected_opt') > 0) ? 'selectOption' : 'selectOption selected_opt';						   				
						getElByCl("selected",this.sb)[0].innerHTML=tg.innerHTML;
						getElByCl("selected",this.sb)[0].id=tg.id;
						if(this.f)
						this.f({id:tg.id,value:tg.innerHTML});
						return false;
					}
				}
		
		// returns selected item
	this.getSelected = function(){		
		var el =getElByCl("selected",this.sb)[0];
		return {id:el.id,value:el.innerHTML};
	};
	
	// disable  selectbox
	this.disable = function(){		
		this.button.onclick  = this.selected.onclick =this.selectOptionsnode.onclick = '';
		this.sb.setAttribute("disabled","disabled");
		this.active = false;
	};
	
	// enable  selectbox
	this.enable = function(p){		
		this.selectOptionsnode.onclick = function (e) {return that.clickItem(e)  }
		this.button.onclick  = this.selected.onclick = function(){ return that.dropdown()}
		this.sb.removeAttribute("disabled");
		this.active = true;
		if(!p)
		this.refresh();
	};
	
	// size() select like function
	this.size = function(value){
		var el_h = getElByCl("selectOption",this.sb)[0].	scrollHeight;
		if(arguments[0]){
			if(typeof arguments[0] === 'number'){
				if(Math.abs(arguments[0])<this.items.length){
					this.mainHeight = Math.abs(arguments[0])*el_h;				
				} else this.mainHeight = el_h*this.items.length; 
			}else alert ("invalid size() function argument type "+typeof arguments[0] +' must be "integer"');
		}else {
			 return Math.round(this.mainHeight / el_h);
		}
			for(var key in bar.aConts){
						if(bar.aConts[key].selectboxid == this.selectboxid)
						bar.aConts[key].mainHeight = this.mainHeight;
					}
		bar.refresh();
	};
	
	// setOnChange callback
	this.setOnChange =function(f){
		this.f = f;
	};
	
	// items management functions
	this.insertItem =function(pos,item){
		if(item&&pos){
			this.items.splice(pos-1,0, item);
			this.refresh();
		}
	};	
	
	this.addItem =function(item){
		if(item){
		this.items.push(item);
		this.refresh();
		}
	};
	
	this.removeItemByPos =function(pos){
		if(pos){
			this.items.splice(pos-1,1);
			this.refresh();
		}
	};
	
	this.removeItemById =function(id){
		if(id){
			for(var key =0;key< this.items.length;key++){
					if(this.items[key]){
						if(this.items[key].id==id){
							this.items.splice(key,1);
							key=0;
						}
					}
			}
			this.refresh();
		}
	};
	
	this.updateItemName =function(id,name){
		if(id&&name){
			for(var key in this.items){
						if(this.items[key].id==id){
							this.items[key].value=name;							
						}
					}
			this.refresh();
		}
	};
	
	//select item by name	
	this.selectByName = function(value){	
			if( arguments[0] ){
				for(var i in this.items){
					if(this.items[i].value==arguments[0]){
						var value = this.items[i].value;
						var id = this.items[i].id;					
					}
				}
				if(value)
					getElByCl("selected",this.sb)[0].innerHTML=value;
					getElByCl("selected",this.sb)[0].id=id;
					if(this.f)
					this.f({id:id,value:value});
					return true;				
			}
		};
		
		//select by pos
	this.selectByPos = function(pos){	
			if( arguments[0] ){				
					if(this.items[pos-1]){
						var value = this.items[pos-1].value;
						var id = this.items[pos-1].id;					
					}				
				if(value)
					getElByCl("selected",this.sb)[0].innerHTML=value;
					getElByCl("selected",this.sb)[0].id=id;
					if(this.f)
					this.f({id:id,value:value});
					return true;				
			}
		};
		
		//select item by id	
	this.selectById = function(id){	
			if( arguments[0] ){
				for(var i in this.items){
					if(this.items[i].id==arguments[0]){
						var value = this.items[i].value;
						var id = this.items[i].id;						
					}
				}
				if(value)
					getElByCl("selected",this.sb)[0].innerHTML=value;
					getElByCl("selected",this.sb)[0].id=id;
					if(this.f)
					this.f({id:id,value:value});
					return true;				
			}
		};
		
		//refresh the select box;
		this.refresh=function(){
			if(this.active){
				this.htmlcontent = createHtml(this.items);
				this.appendTo(this.node);
			}
		};
		var that = this;
		return this;
}})();
var addEvent =(function(){
             if (window.addEventListener) {
                return function(el, sType, fn, capture) {
                    el.addEventListener(sType, fn, (capture));
                };
            } else if (window.attachEvent) {
                return function(el, sType, fn, capture) {
                    el.attachEvent("on" + sType, fn);
                };
            } else {
                return function(){};
            }
        })();
var remEvent =(function(){
             if (window.removeEventListener) {
                return function(el, sType, fn, capture) {
                    el.removeEventListener(sType, fn, (capture));
                };
            } else if (window.detachEvent) {
                return function(el, sType, fn, capture) {
                    el.detachEvent("on" + sType, fn);
                };
            } else {
                return function(){};
            }
})();

		//generate SelectBox html
function createHtml () {	
	if(arguments[0]){
	var arr = arguments[0];
	var htmlstring ='<div id="box_warper" class="box_warper"><div id="select" class="selected"></div><span class="selectArrow">&#9660</span><div id="main_content" class = "main_content"><div id="selectOptions" class="selectOptions" >';
    for (var i in arr) {
    	htmlstring += '<div class="selectOption" id="'+arr[i].id+'">'+arr[i].value+'</div>'   
    }
  	return htmlstring+='</div></div></div>';  	 
  }
}

// getElementsByClassName for IE
var getElByCl=function( classname ,node) {
    var a = [];
    var re = new RegExp('(^| )'+classname+'( |$)');
    var els = node.getElementsByTagName("*");
    for(var i=0; i<els.length; i++)
        if(re.test(els[i].className))a.push(els[i]);
    return a;
}
  // scrollbar initialization

var bar = {
    aConts  : [],
    mouseY : 0,
    N  : 0,
    asd : 0, /*active scrollbar element*/
    sc : 0,
    sp : 0,
    to : 0,

    // constructor
    scrollbar : function (node,mainHeight,selectboxid) {
        var cont = node
		cont.mainHeight = mainHeight;
		cont.selectboxid = selectboxid;
		
        // perform initialization
        if (! bar.init()) return false;

        var cont_clone = cont.cloneNode(false);
        cont_clone.style.overflow = "hidden";
        cont.parentNode.appendChild(cont_clone);
        cont_clone.appendChild(cont);
        cont_clone.style.position = '';        
        cont.style.left = '0px';
        

        // adding new container into array
        bar.aConts[bar.N++] = cont;

        cont.sg = false;

        //creating scrollbar child elements
        cont.st = this.create_div('bar_st', cont, cont_clone);
        cont.sb = this.create_div('bar_sb', cont, cont_clone);
        cont.su = this.create_div('bar_up', cont, cont_clone);
        cont.sd = this.create_div('bar_down', cont, cont_clone);

		//mouse over and out content handler
		cont.onmouseover = function (e) {		
			if (! e) e = window.event;    
            			bar.asd = this;           
            			this.yZ = e.screenY;
                this.sZ = this.scrollTop;
                this.wh = true;
            return false;
		}
		cont.onmouseout  = function (e) {
            if ( this.wh) 
            this.wh = false;
            return false;
        }
        // on mouse down processing
        cont.sb.onmousedown = function (e) {
            if (! this.cont.sg) {
                if (! e) e = window.event;
                bar.asd = this.cont;
                this.cont.yZ = e.screenY;
                this.cont.sZ = cont.scrollTop;
                this.cont.sg = true;

                // new class name
                this.className = 'bar_sb bar_sb_down';
            }
            return false;
        }
        
        // on mouse down on free track area - move our scroll element too
        cont.st.onmousedown = function (e) {
            if (! e) e = window.event;
            bar.asd = this.cont;

            bar.mouseY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
            for (var o = this.cont, y = 0; o != null; o = o.offsetParent) y += o.offsetTop;
            this.cont.scrollTop = (bar.mouseY - y - (this.cont.ratio * this.cont.offsetHeight / 2) - this.cont.sw) / this.cont.ratio;
            this.cont.sb.onmousedown(e);
        }

        // onmousedown events
        cont.su.onmousedown = cont.su.ondblclick = function (e) { bar.mousedown(this, -1); return false; }
        cont.sd.onmousedown = cont.sd.ondblclick = function (e) { bar.mousedown(this,  1); return false; }
        addEvent(cont, 'mousewheel', bar.MouseWheelEvent);  

        //onmouseout events
        cont.su.onmouseout = cont.su.onmouseup = bar.clear;
        cont.sd.onmouseout = cont.sd.onmouseup = bar.clear;

        // on mouse over - apply custom class name: bar_sb_over
        cont.sb.onmouseover = function (e) {
            if (! this.cont.sg) this.className = 'bar_sb bar_sb_over';
            return false;
        }

        // on mouse out - revert back our usual class name 'bar_sb'
        cont.sb.onmouseout  = function (e) {
            if (! this.cont.sg) this.className = 'bar_sb';
            return false;
        }

        // onscroll - change positions of scroll element
        cont.bar_onscroll = function () {
        	if(this.scrollHeight!=0){
            this.ratio = (this.offsetHeight - 2 * this.sw) / this.scrollHeight;
            this.sb.style.top = Math.floor(this.sw + this.scrollTop * this.ratio) + 'px';
           }
        }

        // scrollbar width
        cont.sw = 16;

        // start scrolling
        cont.bar_onscroll();
        bar.refresh();

        // binding own onscroll event
        cont.onscroll = cont.bar_onscroll;
        return cont;
    },

    // initialization
    init : function () {
        if (window.oper || (! window.addEventListener && ! window.attachEvent)) { return false; }

        // binding events
        addEvent(window.document, 'mousemove', bar.onmousemove);
        addEvent(window.document, 'mouseup', bar.onmouseup);
        addEvent(window, 'mousewheel', bar.MouseWheelEvent);        
        addEvent(window, 'scroll', bar.MouseWheelEvent);        
        addEvent(window, 'DOMMouseScroll', bar.MouseWheelEvent);//Mozilla
        addEvent(window, 'resize', bar.refresh);
        //addEvent(window.document, 'click', bar.refresh);
        return true;
    },

    // create and append div finc
    create_div : function(c, cont, cont_clone) {
        var o = document.createElement('div');
        o.cont = cont;
        o.className = c;
        cont_clone.appendChild(o);
        return o;
    },
    // do clear of controls
    clear : function () {
        clearTimeout(bar.to);
        bar.sc = 0;
        return false;
    },
    // refresh scrollbar
    refresh : function () {
        for (var i = 0, N = bar.N; i < N; i++) {
            var o = bar.aConts[i];
			o.style.height = o.mainHeight+"px";
            o.bar_onscroll();
            o.sb.style.width = o.st.style.width = o.su.style.width = o.su.style.height = o.sd.style.width = o.sd.style.height = o.sw + 'px';
            o.sb.style.height = Math.ceil(Math.max(o.sw * .5, o.ratio * o.offsetHeight) + 1) + 'px';
        }
    },
    // arrow scrolling
    arrow_scroll : function () {
        if (bar.sc != 0) {
            bar.asd.scrollTop += 6 * bar.sc / bar.asd.ratio;
            bar.to = setTimeout(bar.arrow_scroll, bar.sp);
            bar.sp = 32;
        }
    },

    /* event binded functions : */
    // scroll on mouse down
    mousedown : function (o, s) {
        if (bar.sc == 0) {
            // new class name
            o.cont.sb.className = 'bar_sb bar_sb_down';
            bar.asd = o.cont;
            bar.sc = s;
            bar.sp = 400;
            bar.arrow_scroll();
        }
    },
    
    MouseWheelEvent: function(e) {    	
		var delta = 0;
		if (!e) //For IE.
			e = window.e;
		if (e.wheelDelta) { //IE/Opera.
			delta = e.wheelDelta/120 ;
		} else if (e.detail) { //Mozilla case
			delta = -e.detail / 3;
		}
		if (delta){
			if (bar.asd.wh) {bar.asd.scrollTop += -delta/5*120 ;
				if (e.preventDefault)
                e.preventDefault();
				e.returnValue = false;				
				}
		}		
		return false;
	},
    // on mouseMove binded event
    onmousemove : function(e) {
        if (! e) e = window.event;
        // get vertical mouse position
        bar.mouseY = e.screenY;
        if (bar.asd.sg) bar.asd.scrollTop = bar.asd.sZ + (bar.mouseY - bar.asd.yZ) / bar.asd.ratio;
    },
    // on mouseUp binded event
    onmouseup : function (e) {
        if (! e) e = window.event;
        var tg = (e.target) ? e.target : e.srcElement;
        if (bar.asd && document.releaseCapture) bar.asd.releaseCapture();

        // new class name
        if (bar.asd) bar.asd.sb.className = (tg.className.indexOf('scrollbar') > 0) ? 'bar_sb bar_sb_over' : 'bar_sb';
        document.onselectstart = '';
        bar.clear();
        bar.asd.sg = false;
    }
}


