// Scoped style
import classes from './style.module.scss';

export default function CommonLoadingSkeleton() {
	return (
		<div className={classes.commonLoadingSkeleton}>
			<div className="circle"></div>
		</div>
	);
}
