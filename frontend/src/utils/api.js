import axios from 'axios';

export async function getIndexRoute() {
	const { data } = await axios.get('http://localhost:8000');
	return data;
}
