import React, { useState } from 'react';

const Tour = ({ id, image, info, price, name, removeTour }) => {
	const [readMore, setReadMore] = useState(false);
	return (
		<div className="single-tour">
			<img src={image} alt={name} />
			<footer>
				<div className="tour-info">
					<h4>{name}</h4>
					<h4 className="tour-price">{price}</h4>
				</div>
				<p>
					{/* nếu readMore == true thì in ra toàn bộ info, còn nếu readMore == false thì in ra 200 từ trong info  */}
					{readMore ? info : `${info.substring(0, 200)}...`}
					{/* Click vào sẽ thay đổi giá trị true false của readMore, nếu readMore hiện đầy đủ info thì hiển thị show less, ngược lại hiển thị readMore */}
					<button onClick={() => setReadMore(!readMore)}>
						{readMore ? 'show less' : 'read more'}
					</button>
				</p>
				<button className="delete-btn" onClick={() => removeTour(id)}>
					Not Interested
				</button>
			</footer>
		</div>
	);
};

export default Tour;
