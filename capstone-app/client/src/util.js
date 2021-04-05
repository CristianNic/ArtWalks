const API_URL = "http://localhost:8090/";

export const login = `${API_URL}/login`;

export const loginUser = (username) => {
	return `${API_URL}login/${username}`;
};
export const getTitle = (title) => {
	return `${API_URL}map/${title}`;
};
export const getNeighbourhood = (neighbourhood) => {
	return `${API_URL}map/${neighbourhood}`;
};

export const areas = [
	"Downtown",
	"Mount Pleasant",
	"Downtown Eastside",
	"West End",
	"Strathcona",
	"Shaughnessy",
	"Stanley Park",
	"Grandview-Woodland",
	"Kensington-Cedar Cottage",
	"Kitsilano",
	"Fairview",
	"Marpole",
	"RileyPark",
	"Oakridge",
	"Renfrew Collingwood",
	"Sunset",
	"Hastings-Sunrise",
	"Killarney",
	"South Cambie",
	"Arbutus Ridge",
	"Dunbar-Southlands",
	"West Point Grey",
	"Kerrisdale",
];
