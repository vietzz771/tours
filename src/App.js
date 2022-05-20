import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import Tours from './Tours';
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tours-project';
function App() {
	const [loading, setLoading] = useState(true);
	const [tours, setTours] = useState([]);

	// Lọc ra tất cả các phần tử có id khác với phần tử có id đã chọn và lưu vào 1 mảng mới (xóa phần tử đã chọn)
	const removeTour = (id) => {
		const newTours = tours.filter((tour) => tour.id !== id);
		setTours(newTours);
	};

	// fetch api từ url
	const fetchTours = async () => {
		// Khi chưa có dữ liệu từ API thì loading sẽ chạy
		setLoading(true);
		try {
			const reponse = await fetch(url);
			const tours = await reponse.json();
			// Khi đã có dữ liệu từ API thì cho loading ngừng chạy và đưa dữ liệu từ API vào tours để render
			setLoading(false);
			setTours(tours);
		} catch (error) {
			// Có lỗi khi không lấy được dữ liệu thì ném lỗi ra
			setLoading(false);
			throw new Error(error);
		}
	};

	// Dùng useEffect để chỉ lấy dữ liệu 1 lần duy nhất
	useEffect(() => {
		fetchTours();
	}, []);

	// Nếu loading == true thì hiển thị loading
	if (loading) {
		return (
			<main>
				<Loading />
			</main>
		);
	}

	// Nếu đã xóa hết phần tử trong mảng thì hiện ra màn hình là không còn phần tử nào và btn để refresh lấy lại dữ liệu load lại từ đầu
	if (tours.length == 0) {
		return (
			<main>
				<div className="title">
					<h2>No tours left</h2>
					<button className="btn" onClick={() => fetchTours()}>
						refresh
					</button>
				</div>
			</main>
		);
	}

	return (
		<main>
			<Tours tours={tours} removeTour={removeTour} />
		</main>
	);
}

export default App;
