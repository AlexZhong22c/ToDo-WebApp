function addClass(r,e){hasClass(r,e)||(r.className=r.className?[r.className,e].join(" "):e)}function hasClass(r,e){var a=r.className;if(!a)return!1;for(var n=0,t=(a=a.split(/\s+/)).length;n<t;n++)if(a[n]===e)return!0;return!1}function isArray(r){return"object"==typeof r&&"[object Array]"===Object.prototype.toString.call(r)}function deleteInArray(r,e){if(isArray(r)&&e<r.length)return r.slice(0,e).concat(r.slice(e+1));console.error("not a arr or index error")}function compareNumbers(r,e){return r-e}