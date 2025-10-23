import styles from "./RecordList.module.css";
import RecordItem from "./RecordItem";
import type { DailyRecordGroup } from "../../types/types";

export interface RecordListProps {
	group: DailyRecordGroup;
}

const RecordList = ({ group }: RecordListProps) => {
	const formattedDate = new Date(group.date).toLocaleDateString("ko-KR", {
		month: "long",
		day: "numeric",
		weekday: "long",
	});

	return (
		<div className={styles.group}>
			{/* Date header */}
			<div className={styles.header}>
				<span className={styles.date}>{formattedDate}</span>
				<span className={styles.total}>
					지출 {group.totals.expense.toLocaleString()}원
				</span>
			</div>

			{/* Individual records */}
			<div className={styles.items}>
				{group.entries.map((entry) => (
					<RecordItem key={entry.id} item={entry} />
				))}
			</div>
		</div>
	);
};

export default RecordList;
