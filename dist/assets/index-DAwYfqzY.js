var F=Object.defineProperty;var V=(n,e,t)=>e in n?F(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var h=(n,e,t)=>(V(n,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const u of i)if(u.type==="childList")for(const f of u.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&o(f)}).observe(document,{childList:!0,subtree:!0});function t(i){const u={};return i.integrity&&(u.integrity=i.integrity),i.referrerPolicy&&(u.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?u.credentials="include":i.crossOrigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function o(i){if(i.ep)return;i.ep=!0;const u=t(i);fetch(i.href,u)}})();class j{constructor(e,t,o,i,u,f,a,d){h(this,"height");h(this,"width");h(this,"xPos");h(this,"yPos");h(this,"xMiddle");h(this,"yMiddle");h(this,"type");h(this,"wallDir");h(this,"lineBeginX");h(this,"lineBeginY");h(this,"lineEndX");h(this,"lineEndY");h(this,"neighbors");h(this,"color");this.height=20,this.width=20,this.xPos=e,this.yPos=t,this.xMiddle=this.xPos+10,this.yMiddle=this.xPos+10,this.type="Wall",this.wallDir=o,this.lineBeginX=i,this.lineBeginY=u,this.lineEndX=f,this.lineEndY=a,this.neighbors=[],this.color=d}}class D{constructor(e,t,o){h(this,"height");h(this,"width");h(this,"xPos");h(this,"yPos");h(this,"xMiddle");h(this,"yMiddle");h(this,"type");h(this,"neighbors");h(this,"lighter");h(this,"darker");h(this,"lightness");h(this,"color");this.height=8,this.width=8,this.xPos=e,this.yPos=t,this.xMiddle=this.xPos+10,this.yMiddle=this.yPos+10,this.type=o,this.neighbors=[],this.lighter=!0,this.darker=!1,this.lightness=50,this.color=""}updateLightness(){this.lighter&&this.lightness<100?this.lightness+=1:this.lightness>=100?(this.lighter=!1,this.darker=!0,this.lightness-=1):this.darker&&this.lightness>50?this.lightness-=1:this.darker&&this.lightness<=50&&(this.lighter=!0,this.darker=!1,this.lightness+=1)}}class q{constructor(e,t,o){h(this,"debug");h(this,"height");h(this,"width");h(this,"xPos");h(this,"yPos");h(this,"steps");h(this,"boardMatrix");h(this,"middlePosTile");h(this,"chaseTimeOut");h(this,"scatterTimeOut");h(this,"frightenedTimeOut");h(this,"lifeLost");h(this,"time");h(this,"setPinky");h(this,"setClyde");h(this,"setInky");h(this,"flicker");h(this,"gameOverScreen");this.debug=!0,this.height=600,this.width=0,this.xPos=150,this.yPos=150,this.steps=20,this.boardMatrix=[],this.createBoard(),this.middlePosTile=this.calculateMiddlePosTile(),this.chaseTimeOut=e,this.scatterTimeOut=t,this.frightenedTimeOut=o,this.lifeLost=!1,this.time=1,this.setPinky=!1,this.setClyde=!1,this.setInky=!1,this.flicker=0,this.gameOverScreen=!1}calculateMiddlePosTile(){let e=[];for(let t=0;t<this.boardMatrix.length;t++)for(let o=0;o<this.boardMatrix[t].length;o++)this.boardMatrix[t][o]&&e.push([this.boardMatrix[t][o].xPos+10,this.boardMatrix[t][o].yPos+10]);return e}createBoard(){let e;var t=["W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	N	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W","W	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	W	N	W	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	W","W	C	W	W	W	W	C	W	W	W	C	C	W	W	W	W	C	W	N	W	C	WR	WR	WR	WR	WR	WR	WR	WR	C	WY	WY	WY	WY	WY	WY	WY	WY	C	WG	WG	WG	WG	WG	WG	WG	WG	C	W	W	W	W	W	W	W	C	W","W	C	W	W	W	W	C	W	W	W	C	W	W	W	W	W	C	W	W	W	C	WR	W	W	W	W	W	W	WR	C	WY	W	W	W	W	W	W	WY	C	WG	W	W	W	W	W	W	WG	C	W	W	W	W	W	W	W	C	W","W	CP	C	C	C	C	C	W	W	W	W	W	W	W	W	C	C	C	C	C	C	WR	W	WR	WR	WR	WR	WR	WR	C	WY	W	WY	WY	WY	WY	WY	WY	C	WG	W	WG	WG	WG	WG	WG	WG	C	C	C	C	C	C	C	C	CP	W","W	W	W	W	W	W	C	W	W	W	W	W	W	W	C	C	W	W	W	W	C	WR	W	WR	CP	C	C	C	C	C	WY	W	WY	C	C	C	C	C	C	WG	W	WG	C	C	C	C	C	C	W	W	C	W	W	W	W	W	W","N	N	N	N	N	W	C	W	W	W	W	W	W	W	C	W	W	N	N	W	C	WR	W	WR	WR	WR	WR	WR	WR	C	WY	W	WY	WY	WY	WY	WY	WY	C	WG	W	WG	WG	WG	WG	WG	WG	C	W	W	C	W	N	N	N	N	N","W	W	W	W	W	W	C	W	W	W	W	W	W	C	C	W	N	N	N	W	C	WR	W	W	W	W	W	W	WR	C	WY	W	W	W	W	W	W	WY	C	WG	W	W	W	W	W	W	WG	C	W	W	C	W	W	W	W	W	W","WN	C	C	C	C	C	C	W	W	W	W	W	W	W	C	W	W	N	N	W	C	WR	W	WR	WR	WR	WR	WR	WR	C	WY	W	WY	WY	WY	WY	WY	WY	C	WG	WG	WG	WG	WG	WG	W	WG	C	W	W	C	C	C	C	C	C	W","W	W	W	W	W	W	C	W	W	W	W	W	W	W	C	C	W	W	W	W	C	WR	W	WR	C	C	C	C	C	C	WY	W	WY	C	C	C	C	C	C	C	C	C	C	C	WG	W	WG	C	W	W	C	W	W	W	W	W	W","N	N	N	N	N	W	C	W	W	W	W	W	W	W	W	C	C	C	C	C	C	WR	W	WR	WR	WR	WR	WR	WR	C	WY	W	WY	WY	WY	WY	WY	WY	C	WG	WG	WG	WG	WG	WG	W	WG	C	W	W	C	W	N	N	N	N	N","W	W	W	W	W	W	C	W	W	W	C	W	W	W	W	W	C	W	W	W	C	WR	W	W	W	W	W	W	WR	C	WY	W	W	W	W	W	W	WY	C	WG	W	W	W	W	W	W	WG	C	C	C	C	W	W	W	W	W	W","W	C	C	C	C	C	C	W	W	W	C	C	W	W	W	W	C	W	N	W	C	WR	WR	WR	WR	WR	WR	WR	WR	C	WY	WY	WY	WY	WY	WY	WY	WY	C	WG	WG	WG	WG	WG	WG	WG	WG	C	W	W	C	C	C	C	C	C	W","W	C	W	W	W	W	C	C	C	C	C	C	C	C	C	C	C	W	N	W	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	W	W	W	C	W	W	W	C	W","W	C	W	W	W	W	C	W	W	W	W	W	W	W	W	W	C	W	N	W	C	W	W	W	W	W	W	W	W	W	W	W	C	W	W	C	W	W	W	W	W	W	W	W	W	W	W	C	W	W	W	C	W	W	W	C	W","W	C	W	W	W	W	C	W	W	W	W	W	W	W	W	W	C	W	N	W	C	W	W	W	W	W	W	W	W	W	W	W	C	W	W	C	W	W	W	W	W	W	W	W	W	W	W	C	W	W	W	C	W	W	W	C	W","W	CP	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	W	N	W	C	C	C	C	C	C	C	C	C	C	C	C	C	W	W	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	CP	W","W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	N	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W"],o=this.xPos+50,i=this.yPos+50;this.width=t[0].split("	").length*this.steps+100,this.height=t.length*this.steps+100;var u="";e=t.map(s=>s.split("	"));let f=1,a=1,d=1,W=1;for(let s=0;s<e.length;s++){var c=[];for(let l=0;l<e[s].length;l++){if(e[s][l].includes("W")){l===0||s===0||l===e[s].length-1||s===e.length-1?s<e.length-1&&l<e[0].length-1&&e[s+1][l+1].includes("C")&&e[s][l+1].includes("W")&&e[s+1][l].includes("W")?(u="rightToBottom",f=o+20,a=i+10,d=o+10,W=i+20):l<e[0].length-1&&s>0&&e[s-1][l+1].includes("C")&&e[s][l+1].includes("W")&&e[s-1][l].includes("W")?(u="rightToTop",f=o+20,a=i+10,d=o+10,W=i):s<e.length-1&&l>0&&e[s+1][l-1].includes("C")&&e[s][l-1].includes("W")&&e[s+1][l].includes("W")?(u="leftToBottom",f=o+20,a=i+10,d=o+10,W=i+20):s>0&&l>0&&e[s-1][l-1].includes("C")&&e[s][l-1].includes("W")&&e[s-1][l].includes("W")?(u="leftToTop",f=o,a=i,d=o+10,W=i+10):s===0||s===e.length-1?(u="leftToRight",f=o,a=i+10,d=o+20,W=i+10):(l===0||l===e[0].length-1)&&(u="upToBottom",f=o+10,a=i,d=o+10,W=i+20):l!==0&&l!==e[s].length-1&&s!==0&&s!==e.length-1&&(e[s-1][l].includes("W")&&e[s+1][l].includes("W")&&e[s][l-1].includes("W")&&e[s][l+1].includes("W")&&e[s-1][l-1].includes("W")&&e[s+1][l+1].includes("W")&&e[s+1][l-1].includes("W")&&e[s-1][l+1].includes("W")?(u="surrounded",f=o+10,a=i,d=o+10,W=i+20):e[s-1][l-1].includes("C")&&!e[s+1][l+1].includes("C")&&e[s-1][l+1].includes("C")&&e[s+1][l-1].includes("C")||!e[s-1][l-1].includes("C")&&e[s+1][l+1].includes("C")&&!e[s-1][l+1].includes("C")&&!e[s+1][l-1].includes("C")&&!e[s+1][l].includes("C")&&!e[s][l+1].includes("C")||e[s-1][l-1].includes("C")&&e[s-1][l].includes("C")&&e[s][l-1].includes("C")?(u="rightToBottom",f=o+20,a=i+10,d=o+10,W=i+20):e[s-1][l-1].includes("C")&&e[s+1][l+1].includes("C")&&e[s-1][l+1].includes("C")&&!e[s+1][l-1].includes("C")||!e[s-1][l-1].includes("C")&&!e[s+1][l+1].includes("C")&&!e[s-1][l+1].includes("C")&&e[s+1][l-1].includes("C")&&!e[s][l-1].includes("C")&&!e[s+1][l].includes("C")&&!e[s][l+1].includes("C")||e[s-1][l].includes("C")&&e[s-1][l+1].includes("C")&&e[s][l+1].includes("C")?(u="leftToBottom",f=o,a=i+10,d=o+10,W=i+20):e[s-1][l-1].includes("C")&&e[s+1][l+1].includes("C")&&!e[s-1][l+1].includes("C")&&e[s+1][l-1].includes("C")||!e[s-1][l-1].includes("C")&&!e[s+1][l+1].includes("C")&&e[s-1][l+1].includes("C")&&!e[s+1][l-1].includes("C")&&!e[s-1][l].includes("C")&&!e[s][l+1].includes("C")||e[s][l-1].includes("C")&&e[s+1][l-1].includes("C")&&e[s+1][l].includes("C")?(u="rightToTop",f=o+20,a=i+10,d=o+10,W=i):!e[s-1][l-1].includes("C")&&e[s+1][l+1].includes("C")&&e[s-1][l+1].includes("C")&&e[s+1][l-1].includes("C")||e[s-1][l-1].includes("C")&&!e[s+1][l+1].includes("C")&&!e[s-1][l+1].includes("C")&&!e[s+1][l-1].includes("C")&&!e[s-1][l].includes("C")&&!e[s][l-1].includes("C")||e[s][l+1].includes("C")&&e[s+1][l+1].includes("C")&&e[s+1][l].includes("C")?(u="leftToTop",f=o+10,a=i,d=o+10,W=i+20):e[s][l-1].includes("W")&&e[s][l+1].includes("W")?(u="leftToRight",f=o,a=i+10,d=o+20,W=i+10):e[s-1][l].includes("W")&&e[s+1][l].includes("W")?(u="upToBottom",f=o+10,a=i,d=o+10,W=i+20):(u="",f=o+10,a=i,d=o+10,W=i+20));let g;e[s][l]==="WR"?g="red":e[s][l]==="WG"?g="lawngreen":e[s][l]==="WY"?g="yellow":g="blue",c.push(new j(o,i,u,f,a,d,W,g))}else e[s][l].includes("C")?e[s][l]==="CP"?c.push(new D(o,i,"PowerUpCoin")):c.push(new D(o,i,"Coin")):e[s][l]==="N"?c.push(new D(o,i,"None")):c.push(null);o+=20}this.boardMatrix.push(c),i+=20,o=this.xPos+50}for(let s=0;s<this.boardMatrix.length;s++)for(let l=0;l<this.boardMatrix[s].length;l++)this.boardMatrix[s][l]&&(s===0?l===0?this.boardMatrix[s][l].neighbors=[null,this.boardMatrix[s+1][l],this.boardMatrix[s][l+1],null]:l===this.boardMatrix[s].length-1?this.boardMatrix[s][l].neighbors=[null,this.boardMatrix[s+1][l],null,this.boardMatrix[s][l-1]]:this.boardMatrix[s][l].neighbors=[null,this.boardMatrix[s+1][l],this.boardMatrix[s][l+1],this.boardMatrix[s][l-1]]:s===this.boardMatrix.length-1?l===0?this.boardMatrix[s][l].neighbors=[this.boardMatrix[s-1][l],null,this.boardMatrix[s][l+1],null]:l===this.boardMatrix[s].length-1?this.boardMatrix[s][l].neighbors=[this.boardMatrix[s-1][l],null,null,this.boardMatrix[s][l-1]]:this.boardMatrix[s][l].neighbors=[this.boardMatrix[s-1][l],null,this.boardMatrix[s][l+1],this.boardMatrix[s][l-1]]:l===0?this.boardMatrix[s][l].neighbors=[this.boardMatrix[s-1][l],this.boardMatrix[s+1][l],this.boardMatrix[s][l+1],null]:l===this.boardMatrix[s].length-1?this.boardMatrix[s][l].neighbors=[this.boardMatrix[s-1][l],this.boardMatrix[s+1][l],null,this.boardMatrix[s][l-1]]:this.boardMatrix[s][l].neighbors=[this.boardMatrix[s-1][l],this.boardMatrix[s+1][l],this.boardMatrix[s][l+1],this.boardMatrix[s][l-1]])}checkPlayerWallCollision(e,t,o){for(let i=0;i<this.boardMatrix.length;i++)for(let u of this.boardMatrix[i]){if(!u||u.type!=="Wall")continue;let f=u;if(f.wallDir==="upToBottom"){let a=f.lineBeginX-1,d=f.yPos;for(let W=0;W<20;W++){const c=a-t,s=d-o,l=(c*c+s*s)**.5,g=t<a?1:2;if(l<e.radius+g)return W===19&&(a<=e.xPos?e.xPos+=2:e.xPos-=2),!0;d+=1}}else if(f.wallDir==="leftToRight"){let a=f.xPos,d=f.lineBeginY-1;for(let W=0;W<20;W++){const c=a-t,s=d-o,l=(c*c+s*s)**.5,g=o<d?1:2;if(l<e.radius+g)return!0;a+=1}}else if(f.wallDir==="rightToBottom"){let a=f.xPos+19,d=f.yPos+9;for(let W=0;W<10;W++){const c=a-t,s=d-o;if((c*c+s*s)**.5<e.radius+1)return e.direction==="right"?(e.yPos-=2,!0):(e.direction==="down"&&(e.xPos-=2),!0);a-=1}for(let W=0;W<10;W++){const c=a-t,s=d-o;if((c*c+s*s)**.5<e.radius+1)return e.direction==="right"?(e.yPos-=2,!0):(e.direction==="down"&&(e.xPos-=2),!0);d+=1}}else if(f.wallDir==="leftToBottom"){let a=f.xPos,d=f.yPos+9;for(let W=0;W<10;W++){const c=a-t,s=d-o;if((c*c+s*s)**.5<e.radius+1)return e.direction==="left"?(e.yPos-=2,!0):(e.direction==="down"&&(e.xPos+=2),!0);a+=1}for(let W=0;W<10;W++){const c=a-t,s=d-o;if((c*c+s*s)**.5<e.radius+1)return e.direction==="left"?(e.yPos-=2,!0):(e.direction==="down"&&(e.xPos+=2),!0);d+=1}}else if(f.wallDir==="rightToTop"){let a=f.xPos+19,d=f.yPos+10;for(let W=0;W<10;W++){const c=a-t,s=d-o;if((c*c+s*s)**.5<e.radius+1)return e.direction==="right"?(e.yPos+=2,!0):(e.direction==="up"&&(e.xPos-=2),!0);a-=1}for(let W=0;W<10;W++){const c=a-t,s=d-o;if((c*c+s*s)**.5<e.radius+1)return e.direction==="right"?(e.yPos+=2,!0):(e.direction==="up"&&(e.xPos-=2),!0);d-=1}}else if(f.wallDir==="leftToTop"){let a=f.xPos,d=f.yPos+9;for(let W=0;W<11;W++){const c=a-t,s=d-o;if((c*c+s*s)**.5<e.radius+1)return e.direction==="left"?(e.yPos+=2,!0):(e.direction==="up"&&(e.xPos+=2),!0);a+=1}for(let W=0;W<11;W++){const c=a-t,s=d-o;if((c*c+s*s)**.5<e.radius+1)return e.direction==="left"?(e.yPos+=1,!0):(e.direction==="up"&&(e.xPos+=2),!0);d-=1}}}return!1}playerCoinCollision(e,t){let o=0,i=0;e.xPos<t.xPos?o=t.xPos:e.xPos>t.xPos+t.width&&(o=t.xPos+t.width+9),e.yPos<t.yPos?i=t.yPos:e.yPos>t.yPos+t.height&&(i=t.yPos+t.height+9);const u=e.xPos-o,f=e.yPos-i;if((u*u+f*f)**.5<=e.radius){e.score+=100;let d=t.type;return t.type="Tile",d}return null}checkPlayerGhostcollision(e,t){let o=t.xPos-e.xPos,i=t.yPos-e.yPos;if(Math.sqrt(o*o+i*i)<e.radius+t.radius)if(!e.touched&&e.frightened){const f=this.boardMatrix[e.tile[0]][e.tile[1]];e.xPos=f.xMiddle,e.yPos=f.yMiddle,e.speed=10,e.touched=!0}else e.speed===10||(this.lifeLost=!0,t.startAngle=Math.PI*1.5,t.endAngle=Math.PI*1.5-.05)}endFrightened(e){e.frightened=!1,e.touched=!1,e.name==="Blinky"&&(e.color="red"),e.name==="Pinky"&&(e.color="pink"),e.name==="Inky"&&(e.color="lightblue"),e.name==="Clyde"&&(e.color="orange"),e.speed=2}}class K{constructor(e,t,o,i,u){h(this,"x");h(this,"y");h(this,"radius");h(this,"dx");h(this,"dy");h(this,"alpha");this.x=e,this.y=t,this.radius=o,this.dx=i,this.dy=u,this.alpha=1}draw(e){e.save(),e.globalAlpha=this.alpha,e.fillStyle="yellow",e.beginPath(),e.arc(this.x,this.y,this.radius,0,Math.PI*2,!1),e.fill(),e.restore()}update(e){this.draw(e),this.alpha-=.01,this.x+=this.dx,this.y+=this.dy}}class L{constructor(e,t){h(this,"xPos");h(this,"yPos");h(this,"radius");h(this,"direction");h(this,"mouthDirection");h(this,"speed");h(this,"score");h(this,"startAngle");h(this,"endAngle");h(this,"eat");h(this,"tile");h(this,"fourTilesAhead");h(this,"lives");h(this,"dead");h(this,"explosion");this.xPos=610,this.yPos=490,this.radius=18,this.speed=2,this.direction="Kees",this.mouthDirection="Open",this.score=t,this.startAngle=Math.PI*1.5,this.endAngle=Math.PI*1.5-.05,this.eat=!1,this.tile=[Math.floor((this.yPos-200)/20),Math.floor((this.xPos-200)/20)],this.fourTilesAhead=[Math.floor((this.yPos-200)/20)-4,Math.floor((this.xPos-200)/20)],this.lives=e,this.dead=!1,this.explosion=null}updateDirection(e,t){let o=this.tile[1],i=this.tile[0];"ArrowLeft"in e?(o<=4?this.fourTilesAhead=this.findEligibleTile(t,i,1):t.boardMatrix[i][o-4]&&t.boardMatrix[i][o-4].type!=="Wall"&&t.boardMatrix[i][o-4].type!=="None"&&(this.fourTilesAhead=this.findEligibleTile(t,i,o-4)),this.direction!=="left"&&(this.direction="left",this.startAngle=Math.PI,this.endAngle=Math.PI-.05,this.mouthDirection="Open")):"ArrowRight"in e?(t.boardMatrix[0].length-1-o<=4?this.fourTilesAhead=this.findEligibleTile(t,i,t.boardMatrix[0].length-2):t.boardMatrix[i][o+4]&&t.boardMatrix[i][o+4].type!=="Wall"&&t.boardMatrix[i][o+4].type!=="None"&&(this.fourTilesAhead=this.findEligibleTile(t,i,o+4)),this.direction!=="right"&&(this.direction="right",this.startAngle=0,this.endAngle=-.05,this.mouthDirection="Open")):"ArrowUp"in e?(i<=4?this.fourTilesAhead=this.findEligibleTile(t,1,o):t.boardMatrix[i-4][o]&&t.boardMatrix[i-4][o].type!=="Wall"&&t.boardMatrix[i-4][o].type!=="None"&&(this.fourTilesAhead=this.findEligibleTile(t,i-4,o)),this.direction!=="up"&&(this.direction="up",this.startAngle=Math.PI*1.5,this.endAngle=Math.PI*1.5-.05,this.mouthDirection="Open")):"ArrowDown"in e&&(t.boardMatrix.length-1-i<=4?this.fourTilesAhead=this.findEligibleTile(t,t.boardMatrix.length-2,o):t.boardMatrix[i+4][o]&&t.boardMatrix[i+4][o].type!=="Wall"&&t.boardMatrix[i+4][o].type!=="None"&&(this.fourTilesAhead=this.findEligibleTile(t,i+4,o)),this.direction!=="down"&&(this.direction="down",this.startAngle=Math.PI/2,this.endAngle=Math.PI/2-.05,this.mouthDirection="Open"))}findEligibleTile(e,t,o){let i=[""];function u(f,a,d,W){let c=[...Array(W.boardMatrix[0].length).keys()];if(!(![...Array(W.boardMatrix.length).keys()].includes(a)||!c.includes(d)||f.includes([a,d].toString())))if(!W.boardMatrix[a][d]||W.boardMatrix[a][d].type==="Wall"||W.boardMatrix[a][d].type==="None"){f.includes([a,d].toString())||f.push([a,d].toString());let l=[[a,d+1],[a,d-1],[a+1,d],[a-1,d]];for(let g of l){let P=u(f,g[0],g[1],W);if(P)return[P[0],P[1]]}}else return[a,d]}return u(i,t,o,e)}move(e,t){"ArrowLeft"in e?this.xPos-=this.speed:"ArrowRight"in e?this.xPos+=this.speed:"ArrowUp"in e?this.yPos-=this.speed:"ArrowDown"in e&&(this.yPos+=this.speed),this.tile=[Math.floor((this.yPos-200)/20),Math.floor((this.xPos-200)/20)],this.updateDirection(e,t)}caught(){this.startAngle+=.08,this.endAngle-=.08}createExplosion(e){let t=[];for(let o=0;o<=150;o++){let i=(Math.random()-.5)*(Math.random()*6),u=(Math.random()-.5)*(Math.random()*6),f=Math.random()*3;const a=e.xPos+4/2,d=e.yPos+4/2;let W=new K(a,d,f,i,u);t.push(W)}return t}}class E{constructor(e){h(this,"xPos");h(this,"yPos");h(this,"radius");h(this,"direction");h(this,"speed");h(this,"color");h(this,"neighbors");h(this,"nextTileCoord");h(this,"prevTileCoord");h(this,"preVisited");h(this,"tile");h(this,"mode");h(this,"home");h(this,"homeTarget");h(this,"name");h(this,"endTile");h(this,"frightened");h(this,"beginTimeMode");h(this,"endTimeMode");h(this,"beginTimeFrightened");h(this,"endTimeFrightened");h(this,"phaseChange");h(this,"touched");h(this,"hasEntered");h(this,"algorithm");h(this,"showAlgorithm");h(this,"showAlgorithmStep");h(this,"path");this.xPos=590,this.yPos=510,this.radius=18,this.speed=2,this.direction="right",this.color="",this.neighbors=[],this.nextTileCoord=[],this.prevTileCoord=[],this.preVisited=e.boardMatrix[0][0],this.tile=[(this.yPos-210)/20,(this.xPos-210)/20],this.mode="chase",this.home=[e.boardMatrix[0][0],e.boardMatrix[0][0]],this.homeTarget=e.boardMatrix[0][0],this.name="Blinky",this.endTile=e.boardMatrix[0][0],this.frightened=!1,this.beginTimeMode=Math.floor(Date.now()/1e3),this.endTimeMode=Math.floor(Date.now()/1e3),this.beginTimeFrightened=0,this.endTimeFrightened=0,this.phaseChange=!1,this.touched=!1,this.hasEntered=!1,this.algorithm="Dijkstra",this.showAlgorithm=!0,this.showAlgorithmStep=[],this.path=[]}_determineEndtile(e,t,o){let i;return this.mode==="chase"?i=e.boardMatrix[t][o]:this.mode==="scatter"?i=this.homeTarget:i=e.boardMatrix[t][o],i}_moveToCenterOfTile(){this.xPos<this.nextTileCoord[0]?this.xPos+=this.speed:this.xPos>this.nextTileCoord[0]?this.xPos-=this.speed:this.yPos<this.nextTileCoord[1]?this.yPos+=this.speed:this.yPos>this.nextTileCoord[1]&&(this.yPos-=this.speed)}_determine_neighbors(e){for(let t=0;t<e.length;t++)for(let o=0;o<e[t].length;o++){let i=e[t][o];i&&this.xPos>=i.xPos&&this.xPos<=i.xPos+19&&this.yPos>=i.yPos&&this.yPos<=i.yPos+19&&(this.neighbors=i.neighbors)}}_assignRandomNextTileCoord(){for(let e of this.neighbors)if(e.type!=="Wall"&&e.type!=="None"&&e!=this.preVisited)return[e.xMiddle,e.yMiddle];return[210,210]}_determineErrorSpot(e,t,o){return e==="Pinky"&&t.length<=2&&o!=="scatter"||e==="Inky"&&t.length<=2&&o!=="scatter"||e==="Clyde"&&t.length<=8&&o!=="scatter"}_determineNextTilePos(e,t,o,i){if(e.length<=1&&this.touched){this.xPos=490,this.yPos=350;return}e.length<=2&&this.mode==="scatter"&&(this.homeTarget===this.home[0]?this.homeTarget=this.home[1]:this.homeTarget=this.home[0]),this._determineErrorSpot(t,e,o)?(this.nextTileCoord=this._assignRandomNextTileCoord(),t==="Clyde"&&(this.mode="scatter")):(this.prevTileCoord=this.nextTileCoord,this.algorithm==="dfs"?this.nextTileCoord=[e[e.length-1].xMiddle,e[e.length-1].yMiddle]:this.nextTileCoord=[e[e.length-2].xMiddle,e[e.length-2].yMiddle]),this.preVisited=i.boardMatrix[this.tile[0]][this.tile[1]],this._moveToCenterOfTile()}_dfs(e,t,o,i){let u=(this.endTile.yMiddle-210)/20,f=(this.endTile.xMiddle-210)/20;if([o,t].toString()===[u,f].toString())return console.log("found Kees"),[i.boardMatrix[o][t]];let a=[...Array(i.boardMatrix[0].length).keys()];if(![...Array(i.boardMatrix.length).keys()].includes(o)||!a.includes(t)||e.includes([o,t].toString())||i.boardMatrix[o][t].type==="Wall"||i.boardMatrix[o][t]===this.preVisited)return;e.push([o,t].toString()),this.showAlgorithmStep.push(i.boardMatrix[o][t]);let W=[[t-1,o],[t+1,o],[t,o-1],[t,o+1]];for(let c of W){let s=c[0],l=c[1],g=this._dfs(e,s,l,i);if(g)return g.push(i.boardMatrix[l][s]),g}}_dfsAlgorithm(e,t,o){let i=this._dfs([],this.tile[1],this.tile[0],e);console.log(i),i&&(this.path=i,this._determineNextTilePos(i,t,o,e))}_bfs(e,t,o,i,u){let f=new Map,a=[],d=[],W=[],c=[Math.floor((t.yPos-200)/20),Math.floor((t.xPos-200)/20)];for(d.push(e);d.length!==0;){let s=d;for(let l of s){let g=d.shift();console.log(l);let P=[Math.floor((g.yPos-200)/20),Math.floor((g.xPos-200)/20)];if(P.toString()===c.toString()){for(;Array.from(f.keys()).includes(g);)g=f.get(g),W.push(g);this._determineNextTilePos(W,i,u,o),this.path=W;return}let w=[[P[0]-1,P[1]],[P[0]+1,P[1]],[P[0],P[1]-1],[P[0],P[1]+1]],T=[...Array(o.boardMatrix[0].length).keys()],y=[...Array(o.boardMatrix.length).keys()];for(let m of w){let b=m[0],Y=m[1],v=o.boardMatrix[b][Y];y.includes(b)&&T.includes(Y)&&!a.includes([b,Y].toString())&&o.boardMatrix[b][Y].type!=="Wall"&&o.boardMatrix[b][Y]!==this.preVisited&&(d.push(o.boardMatrix[b][Y]),f.set(v,g))}a.includes(P.toString())||(a.push(P.toString()),this.showAlgorithmStep.push(g))}}(i==="Pinky"||this.frightened)&&(this.nextTileCoord=this._assignRandomNextTileCoord()),this.preVisited=o.boardMatrix[this.tile[0]][this.tile[1]],this._moveToCenterOfTile()}_DijkstrasAlgorithm(e,t,o,i,u){let f=new Map,a=[];a.push([0,t]);let d=[],W=[],c=e.boardMatrix;for(;a.length!==0;){a=a.sort(function(P,w){return w[0]-P[0]});let s=a.pop(),l=s[1],g=s[0];if(l===o){for(console.log("Kees is there");Array.from(f.keys()).includes(l);)l=f.get(l),W.push(l);this._determineNextTilePos(W,i,u,e),this.path=W;return}d.push([Math.floor((l.yMiddle-200)/20),Math.floor((l.xMiddle-200)/20)].toString());for(let P of l.neighbors){let w=[Math.floor((P.yMiddle-200)/20),Math.floor((P.xMiddle-200)/20)],T=[...Array(c[0].length).keys()];[...Array(c.length).keys()].includes(w[0])&&T.includes(w[1])&&!d.includes(w.toString())&&P.type!=="Wall"&&P!==this.preVisited&&(f.set(P,l),a.push([g+1,P]))}}(i==="Pinky"||this.frightened)&&(console.log("Kees is here"),this.nextTileCoord=this._assignRandomNextTileCoord()),this.preVisited=e.boardMatrix[this.tile[0]][this.tile[1]],this._moveToCenterOfTile()}_aStarAlgorithm(e,t,o,i,u){let f=0,a=[];a.push([0,f,t]);let d=new Map,W=new Map,c=new Map,s=[],l=e.boardMatrix;for(let T=0;T<l.length;T++)for(let y=0;y<l[T].length;y++){if(!l[T][y]||l[T][y].type==="Wall"||l[T][y].type==="None")continue;let m=l[T][y];W.set(m,1/0),c.set(m,1/0)}W.set(t,0);let g=Math.abs(t.xMiddle-o.xMiddle),P=Math.abs(t.yMiddle-o.yMiddle);c.set(t,Math.sqrt(g*g+P*P));let w=new Set;for(w.add(t);a.length!==0;){let T=a.sort(function(m,b){return b[0]-m[0]}),y=T.pop()[2];if(console.log(T),w.delete(y),y===o){for(;Array.from(d.keys()).includes(y);)y=d.get(y),s.push(y);this._determineNextTilePos(s,i,u,e),this.path=s;return}for(let m of y.neighbors)if(m&&m.type!=="Wall"&&m.type!=="None"&&m!==this.preVisited){console.log("Kees is here");let b=W.get(y)+1;if(b<W.get(m)){d.set(m,y),W.set(m,b);let Y=Math.abs(m.xMiddle-o.xMiddle),v=Math.abs(m.yMiddle-o.yMiddle),X=Math.sqrt(Y*Y+v*v);c.set(m,b+X),w.has(m)||(f+=1,a.push([c.get(m),f,m]),w.add(m))}this.showAlgorithmStep.push(m)}}(i==="Pinky"||this.frightened)&&(this.nextTileCoord=this._assignRandomNextTileCoord()),this.preVisited=e.boardMatrix[this.tile[0]][this.tile[1]],this._moveToCenterOfTile()}move(e,t,o,i,u,f){if(e.middlePosTile.some(d=>d[0]===this.xPos&&d[1]===this.yPos)){this.showAlgorithmStep=[];let d=e.boardMatrix[this.tile[0]][this.tile[1]],W,c;if(this.touched)this.endTile=e.boardMatrix[7][14];else{if(o==="Blinky")W=t.tile[1],c=t.tile[0];else if(o==="Pinky")W=t.fourTilesAhead[1],c=t.fourTilesAhead[0];else if(o==="Inky"){let P=u.determineTarget(f,t,e);W=P[1],c=P[0]}else W=t.fourTilesAhead[1],c=t.fourTilesAhead[0];this.endTile=this._determineEndtile(e,c,W)}let s=t.xPos-this.xPos,l=t.yPos-this.yPos,g=Math.sqrt(s*s+l*l);if(this.touched&&g<this.radius+t.radius&&(this.preVisited=e.boardMatrix[t.tile[0]][t.tile[1]]),this.phaseChange){this.nextTileCoord=this.prevTileCoord,this.phaseChange=!1,this.preVisited=e.boardMatrix[this.tile[0]][this.tile[1]],this._moveToCenterOfTile();return}this._determine_neighbors(e.boardMatrix),this.algorithm==="aStar"?this._aStarAlgorithm(e,d,this.endTile,o,i):this.algorithm==="dfs"?(this._dfsAlgorithm(e,o,i),console.log("Executed")):this.algorithm==="bfs"?(this._bfs(d,this.endTile,e,o,i),console.log("Executed BFS")):this.algorithm==="Dijkstra"&&this._DijkstrasAlgorithm(e,d,this.endTile,o,i)}else this._moveToCenterOfTile();this.tile=[Math.floor((this.yPos-200)/20),Math.floor((this.xPos-200)/20)]}becomeFrightened(){this.frightened=!0,this.phaseChange=!0,this.speed=1,this.color="blue"}}class U extends E{constructor(e){super(e),this.xPos=490,this.yPos=350,this.color="red",this.tile=[(this.yPos-210)/20,(this.xPos-210)/20];let t=e.boardMatrix[1].length-2,o=e.boardMatrix[1].length-8;this.home=[e.boardMatrix[1][t],e.boardMatrix[1][o]],this.homeTarget=e.boardMatrix[1][t],this.name="Blinky"}}class z extends E{constructor(e){super(e),this.xPos=530,this.yPos=350,this.color="pink",this.tile=[(this.yPos-210)/20,(this.xPos-210)/20],this.home=[e.boardMatrix[1][1],e.boardMatrix[1][4]],this.homeTarget=e.boardMatrix[1][1],this.name="Pinky"}enter(){!this.hasEntered&&this.xPos!==490?this.xPos-=1:this.tile=[(this.yPos-210)/20,(this.xPos-210)/20]}}class H extends E{constructor(e){super(e),this.xPos=570,this.yPos=370,this.color="lightblue",this.tile=[(this.yPos-210)/20,(this.xPos-210)/20];let t=e.boardMatrix.length-2,o=e.boardMatrix.length-2,i=e.boardMatrix[t].length-2,u=e.boardMatrix[t].length-10;this.home=[e.boardMatrix[t][i],e.boardMatrix[o][u]],this.homeTarget=e.boardMatrix[t][i],this.name="Inky"}determineTarget(e,t,o){let i=t.fourTilesAhead[1]-Math.floor(e.tile[1]),u=t.fourTilesAhead[0]-Math.floor(e.tile[0]),f=o.boardMatrix.length,a=o.boardMatrix[0].length,d,W;return u>=0?t.fourTilesAhead[0]+u>f-2?W=f-2:W=t.fourTilesAhead[0]+u:t.fourTilesAhead[0]+u<1?W=1:W=t.fourTilesAhead[0]+u,i>=0?t.fourTilesAhead[1]+i>a-2?d=a-2:d=t.fourTilesAhead[1]+i:t.fourTilesAhead[1]+i<1?d=1:d=t.fourTilesAhead[1]+i,t.findEligibleTile(o,W,d)}enter(){!this.hasEntered&&(this.xPos!==490||this.yPos!==350)?(!this.hasEntered&&this.yPos!==350?this.yPos-=1:!this.hasEntered&&this.xPos!==490&&(this.xPos-=1),console.log(this.xPos,this.yPos)):this.tile=[(this.yPos-210)/20,(this.xPos-210)/20]}}class $ extends E{constructor(t){super(t);h(this,"lost");this.xPos=570,this.yPos=330,this.color="orange",this.tile=[(this.yPos-210)/20,(this.xPos-210)/20];let o=t.boardMatrix.length-2,i=t.boardMatrix.length-6;this.home=[t.boardMatrix[o][1],t.boardMatrix[i][1]],this.homeTarget=t.boardMatrix[o][1],this.name="Clyde",this.lost=!1}enter(){!this.hasEntered&&(this.xPos!==490||this.yPos!==350)?(console.log("Kees not there"),!this.hasEntered&&this.yPos!==350?this.yPos+=1:!this.hasEntered&&this.xPos!==490&&(console.log("Kees here"),this.xPos-=1)):this.tile=[(this.yPos-210)/20,(this.xPos-210)/20]}}class B{constructor(e,t,o){h(this,"text");h(this,"fillColor");h(this,"textColor");h(this,"x");h(this,"y");h(this,"width");h(this,"height");this.text=e,this.fillColor=t,this.textColor=o,this.x=0,this.y=0,this.width=0,this.height=0,this.onClick=this.onClick.bind(this)}onClick(){console.log("Button was clicked!")}setPosition(e,t){this.x=e,this.y=t}setSize(e,t){this.width=e,this.height=t}draw(e){e.fillStyle=this.fillColor,e.fillRect(this.x,this.y,this.width,this.height),e.fillStyle=this.textColor,e.textAlign="center",e.textBaseline="middle",e.font="25px arial",e.fillText(this.text,this.x+this.width/2,this.y+this.height/2,this.width)}inBounds(e,t){return!(e<this.x||e>this.x+this.width||t<this.y||t>this.y+this.height)}}let M=document.querySelector("canvas");const r=M==null?void 0:M.getContext("2d");M.width=window.innerWidth;M.height=window.innerHeight;var k={};window.addEventListener("keydown",function(n){k[n.key]=!0,n.preventDefault()});window.addEventListener("keyup",function(n){delete k[n.key]});function J(){let n=[],e=new B("Restart Game","#eeaa00","black"),t=new B("End Game","#eeaa00","black");return e.setPosition(M.width/2-200,M.height/2),t.setPosition(M.width/2+50,M.height/2),e.onClick=()=>{document.location.reload()},n.push(e),n.push(t),n.forEach(o=>o.setSize(150,75)),n}let C,x,S,R,p,A,G,O,_,I,Q=J();function Z(){O=20,_=7,I=10,C=new L(0,0),x=new q(O,_,I),S=new U(x),R=new z(x),p=new H(x),A=new $(x),G=[S,R,A,p],x.time=0}function ee(){let n=C;C=new L(n.lives,n.score),S.xPos=490,S.yPos=350,A.xPos=570,A.yPos=330,p.xPos=570,p.yPos=370,R.xPos=530,R.yPos=350,x.lifeLost=!1,x.gameOverScreen=!1;for(let e of G)e.touched=!1,e.frightened=!1,e.tile=[Math.floor((e.yPos-200)/20),Math.floor((e.xPos-200)/20)],e.name!=="Blinky"&&(e.hasEntered=!1),console.log(e);x.time=1}function te(){r.fillStyle="black",r==null||r.fillRect(x.xPos,x.yPos,x.width,x.height);for(let t=0;t<x.boardMatrix.length;t++)for(let o=0;o<x.boardMatrix[0].length;o++)if(x.boardMatrix[t][o]){if(x.boardMatrix[t][o].type==="Coin"&&(r.fillStyle=x.boardMatrix[t][o].color),x.boardMatrix[t][o].type==="Wall"){r.strokeStyle=x.boardMatrix[t][o].color,r.lineWidth=2,r==null||r.beginPath();let i=x.boardMatrix[t][o];i.wallDir==="leftToRight"?(r==null||r.moveTo(i.xPos,i.yPos+10),r==null||r.lineTo(i.xPos+20,i.yPos+10)):i.wallDir==="upToBottom"?(r==null||r.moveTo(i.xPos+10,i.yPos),r==null||r.lineTo(i.xPos+10,i.yPos+20)):i.wallDir==="rightToBottom"?(r==null||r.moveTo(i.xPos+20,i.yPos+10),r==null||r.arcTo(i.xPos+10,i.yPos+10,i.xPos+10,i.yPos+20,10)):i.wallDir==="leftToBottom"?(r==null||r.moveTo(i.xPos,i.yPos+10),r==null||r.arcTo(i.xPos+10,i.yPos+10,i.xPos+10,i.yPos+20,10)):i.wallDir==="rightToTop"?(r==null||r.moveTo(i.xPos+20,i.yPos+10),r==null||r.arcTo(i.xPos+10,i.yPos+10,i.xPos+10,i.yPos,10)):i.wallDir==="leftToTop"&&(r==null||r.moveTo(i.xPos,i.yPos+10),r==null||r.arcTo(i.xPos+10,i.yPos+10,i.xPos+10,i.yPos,10)),r==null||r.stroke()}else if(x.boardMatrix[t][o].type==="Coin"){let i=x.boardMatrix[t][o];r.fillStyle="orange",r.beginPath(),r.moveTo(C.xPos,C.yPos),r.arc(i.xPos+10,i.yPos+10,2,0,90,!1),r.lineTo(C.xPos,C.yPos),r.fill(),x.playerCoinCollision(C,i)}else if(x.boardMatrix[t][o].type==="PowerUpCoin"){let i=x.boardMatrix[t][o];i.updateLightness(),r.fillStyle=`hsl(62,100%,${i.lightness}%)`,r.beginPath(),r.moveTo(C.xPos,C.yPos),r.arc(i.xPos+10,i.yPos+10,10,0,90,!1),r.lineTo(C.xPos,C.yPos),r.fill();let u=x.playerCoinCollision(C,i);if(u&&u==="PowerUpCoin")for(let f of G)f.becomeFrightened(),f.beginTimeFrightened=Math.floor(Date.now()/1e3),f.endTimeFrightened=Math.floor(Date.now()/1e3)}r.fillStyle="red"}let n=220,e=570;r.fillStyle="yellow";for(let t=0;t<C.lives;t++){r.beginPath(),r.moveTo(n,e);let o=Math.PI+.55,i=Math.PI-.55;r.arc(n,e,10,o,i,!1),r.lineTo(n,e),r.fill(),n+=30}}function ie(n,e){r.fillStyle="#808080",r.beginPath(),r==null||r.roundRect(M.width/3,M.height/3,M.width/3,M.height/3,50),r.fill(),r.font="20px Courier New",r.textAlign="center",r.strokeStyle="white",r.strokeText("Oh he dead",M.width/2,M.height/2-80),e.gameOverScreen||(M.addEventListener("click",t=>{let o=t.pageX-(M.clientLeft+M.offsetLeft),i=t.pageY-(M.clientTop+M.offsetTop);n.forEach(u=>{u.inBounds(o,i)&&u.onClick&&u.onClick()})}),e.gameOverScreen=!0),n.forEach(t=>t.draw(r))}function se(){if(x.lifeLost)Math.abs(C.startAngle-C.endAngle)<=Math.PI*2-.155?C.caught():(C.dead=!0,C.explosion||(C.explosion=C.createExplosion(C)),C.explosion.forEach((t,o)=>{t.alpha<=0?C.explosion.splice(o,1):t.update(r)})),C.explosion&&C.explosion.length===0&&(C.lives>0?(C.lives-=1,ee()):ie(Q,x));else{if(C.updateDirection(k,x),C.direction==="right")var n=C.xPos+C.speed,e=C.yPos;else if(C.direction==="left")var n=C.xPos-C.speed,e=C.yPos;else if(C.direction==="up")var n=C.xPos,e=C.yPos-C.speed;else var n=C.xPos,e=C.yPos+C.speed;x.checkPlayerWallCollision(C,n,e)||C.move(k,x)}}function oe(){C.dead||(r.beginPath(),r.moveTo(C.xPos,C.yPos),r.arc(C.xPos,C.yPos,C.radius,C.startAngle,C.endAngle,!1),r.lineTo(C.xPos,C.yPos),r.fillStyle="yellow",r.fill(),Object.keys(k).length!==0&&(C.mouthDirection==="Open"?(C.startAngle+=.08,C.endAngle-=.08):(C.startAngle-=.08,C.endAngle+=.08)),Math.abs(C.startAngle-C.endAngle)>2.5?C.mouthDirection="Close":Math.abs(C.startAngle-C.endAngle)<.17&&(C.mouthDirection="Open"))}function le(){for(let n of G)if(r.fillStyle=n.color,r==null||r.beginPath(),r==null||r.arc(n.xPos,n.yPos,n.radius,0,2*Math.PI),r==null||r.fill(),n.hasEntered&&(n.move(x,C,n.name,n.mode,p,S),n.showAlgorithm&&n.name==="Pinky")){n.showAlgorithmStep.map(o=>r.fillRect(o.xMiddle,o.yMiddle,10,10)),r.fillStyle="green";let e=n.endTile.xMiddle,t=n.endTile.yMiddle;r.fillRect(e,t,10,10),r.fillStyle="red",n.path.map(o=>r.fillRect(o.xMiddle,o.yMiddle,10,10))}}function re(){r==null||r.clearRect(0,0,M.width,M.height),r.fillStyle="black",r==null||r.fillRect(0,0,M.width,M.height),te(),oe(),x.lifeLost||le()}function he(){for(let n of G)if(!n.frightened)n.mode==="chase"?n.endTimeMode-n.beginTimeMode>x.chaseTimeOut?(n.mode="scatter",n.beginTimeMode=Math.floor(Date.now()/1e3),n.endTimeMode=Math.floor(Date.now()/1e3),n.phaseChange=!0):n.endTimeMode=Math.floor(Date.now()/1e3):n.mode==="scatter"&&(n.endTimeMode-n.beginTimeMode>x.scatterTimeOut?(n.mode="chase",n.beginTimeMode=Math.floor(Date.now()/1e3),n.endTimeMode=Math.floor(Date.now()/1e3),n.phaseChange=!0):n.endTimeMode=Math.floor(Date.now()/1e3));else{let e=n.xPos%2===0&&n.yPos%2===0;n.endTimeFrightened-n.beginTimeFrightened>x.frightenedTimeOut&&e||n.touched&&n.xPos===490&&n.yPos===350?x.endFrightened(n):n.endTimeFrightened=Math.floor(Date.now()/1e3)}}function N(){x.time+=1,re(),se();const n=e=>e.type!=="coin";if(!x.boardMatrix.flat().some(n))x.flicker===0&&setTimeout(()=>{console.log("Timeout")},1500),x.boardMatrix.map(e=>e.map(t=>t.hasOwnProperty("color")&&t.color==="blue"?t.color="white":t.hasOwnProperty("color")&&t.color==="white"?t.color="blue":console.log("Nothing"))),x.flicker<=7&&(x.flicker+=1,setTimeout(()=>{window.requestAnimationFrame(N)},500));else{if(!x.lifeLost){x.time>=100&&!R.hasEntered&&(R.enter(),R.tile=[(R.yPos-210)/20,(R.xPos-210)/20],R.xPos===490&&R.yPos===350&&(R.hasEntered=!0)),A.hasEntered||C.score>=1e3&&x.time>=50&&(A.enter(),A.tile=[(A.yPos-210)/20,(A.xPos-210)/20],A.xPos===490&&A.yPos===350&&(A.hasEntered=!0)),p.hasEntered||C.score>=500&&x.time>=150&&(p.enter(),p.tile=[(p.yPos-210)/20,(p.xPos-210)/20],p.xPos===490&&p.yPos===350&&(p.hasEntered=!0)),he();for(let e of G)x.checkPlayerGhostcollision(e,C)}window.requestAnimationFrame(N)}}Z();N();