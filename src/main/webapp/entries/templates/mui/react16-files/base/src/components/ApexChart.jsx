import dynamic from "next/dynamic";
// apex chart instance
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
const ApexChart = (props) => <ReactApexChart {...props} />;
export default ApexChart;
