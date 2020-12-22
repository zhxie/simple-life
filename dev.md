# Simple Life Development Documentation

## Web API

_The application is in development and the API may be changed at any time._

### Generic

#### Place

The `Place` represents a place in a city.

| Member   | Type       | Description                                 |
| -------- | ---------- | ------------------------------------------- |
| name     | string     | Represents the name of the `Place`.         |
| province | string     | Represents the province of the `Place`.     |
| city     | string     | Represents the city of the `Place`.         |
| district | string     | Represents the district of the `Place`.     |
| address  | string     | Represents the address of the `Place`.      |
| location | `Location` | Represents the location of the `Place`.     |
| tel      | string     | Represents the phone number of the `Place`. |

#### Location

The `Location` represents the absolute position of a place in LLA coordinate system (w/o altitude).

| Member    | Type   | Description                                                             |
| --------- | ------ | ----------------------------------------------------------------------- |
| latitude  | number | Represents the latitude of the `Location`, ranges from `-180` to `180`. |
| longitude | number | Represents the longitude of the `Location`, ranges from `-90` to `90`.  |

#### Distance

The `Distance` represents the distance from the origin to the destination.

| Member   | Type | Description                                                            |
| -------- | ---- | ---------------------------------------------------------------------- |
| distance | int  | Represents the distance of the `Distance`, in meter.                   |
| duration | int  | Represents the total time travel on foot of the `Distance`, in second. |

#### Around

The `Around` represents a place and its distance from the origin.

| Member   | Type       | Description                              |
| -------- | ---------- | ---------------------------------------- |
| place    | `Place`    | Represents the place of the `Around`.    |
| distance | `Distance` | Represents the distance of the `Around`. |

### Search for a Place

#### Request

`GET /s/<city>/<name>`

The `<city>` is a city name in Chinese or Chinese pinyin.

#### Response

##### `404`

Represents nothing was found.

##### `200`

| Member | Type      | Description                                                                                 |
| ------ | --------- | ------------------------------------------------------------------------------------------- |
| count  | int       | Represents the total number of the searching results, unequal to the places list, positive. |
| places | `Place`[] | Represents the places found.                                                                |

### Get a Place

#### Request

`GET /p/<city>/<name>`

#### Response

##### `404`

Represents nothing was found.

##### `200`

| Member | Type    | Description                 |
| ------ | ------- | --------------------------- |
|        | `Place` | Represents the place found. |

### Get the Nearest Preset Place

#### Request

`GET /n/<latitude>,<longitude>/<keyword>`

The `<keyword>` may be `kfc` for KFC, `mc` for McDonald's, `fastfood` for fast food restaurant, `drink` for drink shop, `coffee` for café, `cvs` for convenience shop, `supermarket` for super market, `market` for market or `bank` for bank.

#### Response

##### `404`

Represents nothing was found.

##### `200`

| Member | Type     | Description                                                 |
| ------ | -------- | ----------------------------------------------------------- |
|        | `Around` | Represents the place found with its distance to the origin. |

### Get the List of Around Places by Type

#### Request

`GET /a/<latitude>,<longitude>/<type>`

The `<type>` may be `gas` for gas stations, `restaurant` for restaurants, `coffee` for café, `drink` for drink shop, `bakery` for bakeries and desserts, `plaza` for plazas, `cvs` for convenience shops, `supermarket` for super markets, `market` for markets, `hospital` for hospitals, `pharmacy` for hospitals and pharmacies, `subway` for subway stations, `bus` for bus stops or `bank` for banks.

#### Response

##### `404`

Represents nothing was found.

##### `200`

| Member  | Type        | Description                                                                                  |
| ------- | ----------- | -------------------------------------------------------------------------------------------- |
| count   | int         | Represents the total number of the searching results, unequal to the arounds list, positive. |
| arounds | `Arounds`[] | Represents the places found with their distance to the origin.                               |

### Get the summary of a Place

#### Request

`GET /<city>/<name>`

#### Response

##### `404`

Represents nothing was found.

##### `200`

| Member | Type                                | Description                                                                                             |
| ------ | ----------------------------------- | ------------------------------------------------------------------------------------------------------- |
| place  | `Place`                             | Represents the place found.                                                                             |
| near   | { [key: string]: `Around` \| null } | Represents the nearest preset places described in `/n` interface, the key is the same with `<keyword>`. |
