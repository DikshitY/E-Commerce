import { useDispatch, useSelector } from "react-redux";
import { changePrice, changeRating } from "../store";

function Filters() {
  const dispatch = useDispatch();
  const { price, rating } = useSelector(({ filter }) => {
    return {
      price: filter.price,
      rating: filter.rating,
    };
  });
  // const price = useSelector(state => state.filter.price)
  // const rating = useSelector(state => state.filter.rating)

  const handlePriceRangeChange = (value) => {
    dispatch(changePrice(value));
  };

  const handleRatingChange = (value) => {
    dispatch(changeRating(value));
  };

  return (
    <div className="flex flex-col min-w-full p-4">
      <p className="font-semibold mt-2">Price Range</p>
      <div className="flex flex-col py-2 border-b-2 border-gray-200">
        <label>
          <input
            className="mr-2"
            type="checkbox"
            name="priceRange"
            checked={price === "Under 10000"}
            onChange={() => handlePriceRangeChange("Under 10000")}
          />
          Under Rs.10,000
        </label>
        <label>
          <input
            className="mr-2"
            type="checkbox"
            name="priceRange"
            checked={price === "10000-20000"}
            onChange={() => handlePriceRangeChange("10000-20000")}
          />
          Rs.10,000 - Rs.20,000
        </label>
        <label>
          <input
            className="mr-2"
            type="checkbox"
            name="priceRange"
            checked={price === "20000-30000"}
            onChange={() => handlePriceRangeChange("20000-30000")}
          />
          Rs.20,000 - Rs.30,000
        </label>
        <label>
          <input
            className="mr-2"
            type="checkbox"
            name="priceRange"
            checked={price === "30000-50000"}
            onChange={() => handlePriceRangeChange("30000-50000")}
          />
          Rs.30,000 - Rs.50,000
        </label>
        <label>
          <input
            className="mr-2"
            type="checkbox"
            name="priceRange"
            checked={price === "Above 50000"}
            onChange={() => handlePriceRangeChange("Above 50000")}
          />
          Above Rs.50,000
        </label>
      </div>
      <p className="font-semibold mt-2">Ratings</p>
      <div className="flex flex-col py-2 border-b-2 border-gray-200">
        <label>
          <input
            className="mr-2"
            type="checkbox"
            name="ratings"
            checked={rating === 5}
            onChange={() => handleRatingChange(5)}
          />
          5 Star
        </label>
        <label>
          <input
            className="mr-2"
            type="checkbox"
            name="ratings"
            checked={rating === 4}
            onChange={() => handleRatingChange(4)}
          />
          4 Star
        </label>
        <label>
          <input
            className="mr-2"
            type="checkbox"
            name="ratings"
            checked={rating === 3}
            onChange={() => handleRatingChange(3)}
          />
          3 Star
        </label>
        <label>
          <input
            className="mr-2"
            type="checkbox"
            name="ratings"
            checked={rating === 2}
            onChange={() => handleRatingChange(2)}
          />
          2 Star
        </label>
        <label>
          <input
            className="mr-2"
            type="checkbox"
            name="ratings"
            checked={rating === 1}
            onChange={() => handleRatingChange(1)}
          />
          1 Star
        </label>
      </div>
    </div>
  );
}

export default Filters;
