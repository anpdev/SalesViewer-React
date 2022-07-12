import { getPalette } from 'devextreme/viz/palette';
import { currentTheme, getTheme, refreshTheme } from 'devextreme/viz/themes';
import * as Color from 'color';


export function getColor(category, criteria ) {
        const palette = getPalette(getThemeItem('defaultPalette'))['simpleSet'];
        return palette[category, criteria];
     
} 
export  function getCriteriaIndex(category, criteria) {  
    
     return criteria1(category).indexOf(criteria);
 }

 
export function criteria1(category) {
    
    let categoryItems  = {
        'category': ['Banking', 'Energy', 'Health', 'Insurance', 'Manufacturing', 'Telecom'],
        'product': ['Eco Max', 'Eco Supreme', 'EnviroCare', 'EnviroCare Max', 'SolarMax', 'SolarOne'],
        'channel': ['Consultants', 'Direct', 'Resellers', 'Retail', 'VARs']
    };
  
    return categoryItems[category.toLowerCase()];
}

export function getThemeItem(...keys) { 
    const theme = getTheme(currentTheme());
    let item = theme; 
  
    for(let key in keys) {
        item = item[keys[key]];
    }
     return item;
   
}
applyTheme("carmine");
export function applyTheme(theme) {
    let themeMarker = "dx.theme.",
        storageKey = "salesViewerTheme";
    theme = theme || window.localStorage[storageKey] || "carmine";  

  
    for(let index in document.styleSheets) {
        let styleSheet = document.styleSheets[index],
            href = styleSheet.href;
             
        if(href) {
            let themeMarkerPosition = href.indexOf(themeMarker);
            if(themeMarkerPosition >= 0) {
                let startPosition = themeMarkerPosition + themeMarker.length,
                    endPosition = href.indexOf(".", startPosition),
                    fileNamePart = href.substring(startPosition, endPosition);
                styleSheet.disabled = fileNamePart != theme;
            }
        }
    }
    
    window.localStorage[storageKey] = theme;
    currentTheme('generic.' + theme);
    //refreshTheme();
    //this.themeChanged.next(theme);
}
export function blendColor(backgroundColor, overColor)   {
    return Color.rgb(
        Math.floor(backgroundColor.red() + (overColor.red() - backgroundColor.red()) * overColor.alpha()),
        Math.floor(backgroundColor.green() + (overColor.green() - backgroundColor.green()) * overColor.alpha()),
        Math.floor(backgroundColor.blue() + (overColor.blue() - backgroundColor.blue()) * overColor.alpha())
    );
}

export function getAccentColor() {
    return getPalette(getThemeItem('defaultPalette')).accentColor;
}

 