import {
    ChartMenuContainer,
    ChartMenuOption,
    ChartMenuSelect,
    ChartMenuTitle
} from '../LineChart/LineChartMenuElements';

const ScatterChartMenu = ({   locations,
                              timeRange,
                              selectedLocation,
                              onLocationChange,
                              onTimeRangeChange,
}) => {
    return (
        <ChartMenuContainer>
            <ChartMenuTitle>Location:</ChartMenuTitle>
            <ChartMenuSelect value={selectedLocation} onChange={onLocationChange}>
                {locations.map(location => (
                    <ChartMenuOption key={location} value={location}>{location}</ChartMenuOption>
                ))}
            </ChartMenuSelect>
            <ChartMenuTitle>Time Range:</ChartMenuTitle>
            <ChartMenuSelect value={timeRange} onChange={onTimeRangeChange}>
                <ChartMenuOption value="none">All time</ChartMenuOption>
                <ChartMenuOption value="day">Last day</ChartMenuOption>
                <ChartMenuOption value="week">Last week</ChartMenuOption>
                <ChartMenuOption value="month">Last month</ChartMenuOption>
            </ChartMenuSelect>
        </ChartMenuContainer>
);
};

export default ScatterChartMenu;