// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  
  GEOSERVER: 'http://10.70.123.74:31808/geoserver/wms',
  // GEOSERVER: 'http://10.159.131.28:31808/geoserver/wms',
  // GEOSERVER: 'http://10.159.131.28:31808/geoserver/VungTau_141_95/wms',
  SRID: {
		NAME: 'VN2000_VTU',
		CITY_CODE: '77',
    CITY_LONGITUDE: '107.75',
    CITY_NAME: 'Tỉnh Bà Rịa - Vũng Tàu',
    DISTRICT_CODE: '747',
    DISTRICT_NAME: 'Thành phố Vũng Tàu',
	}
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
