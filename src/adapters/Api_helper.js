import axios from 'axios';

const Api_helper = () => {
	const registerFormApi = async (formData) => {

		return axios({
			method: 'post',
			url: `http://localhost:5000/api/register`,
			headers: {
				'Content-Type': 'application/json',
			},
			data: formData,
		});
	};
	



	return { registerFormApi };
};




export default Api_helper;
