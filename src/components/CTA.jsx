import { Link } from "react-router-dom";

const CTA = () => {
	return (
		<section className="cta">
			<p className="cta-text">
				Ready to turn your ideas into reality? <br className="sm:block hidden" />
				Let's create something amazing together!
			</p>
			<Link to="/contact" className="btn">
				Contact
			</Link>
		</section>
	);
};

export default CTA;
