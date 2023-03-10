/* import "./RatingStar.scss";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
const RatingStar = ({ rating, limit = 5 }) => {
	const active = StarIcon;
	const passive = StarBorderIcon;
	const mapper = Array.from(new Array(limit), (_, index) => {
		if (index + 1 <= Number(rating))
			return <img className={"star"} key={index} src={active} alt="color" />;
		return <img className={"star"} key={index} src={passive} alt="color" />;
	});
	return <div className={"star__container"}>{mapper}</div>;
};
export default RatingStar;
 */
