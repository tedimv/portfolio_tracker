import SummaryCards from "./SummaryCards";
import ChartCard from "./ChartCard";

const AssetsDistribution = () => {
    return (
        <div className="flex flex-col w-full gap-3">
            <SummaryCards />
            <ChartCard />
        </div>
    );
};

export default AssetsDistribution;
