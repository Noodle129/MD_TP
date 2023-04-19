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
                              onPollutantInsertion,
                              pollutants,
                              selectedPollutants,
                              handleReset,
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
            <ChartMenuTitle>Pollutant:</ChartMenuTitle>
            <ChartMenuSelect value={pollutants[0]} onChange={onPollutantInsertion}>
                {pollutants.map((item, index) => (
                    <ChartMenuOption key={index} value={item}>
                        {item}
                    </ChartMenuOption>
                ))}
            </ChartMenuSelect>
            {selectedPollutants.length > 0 && (
                <div >
                    {pollutants[0]}, {selectedPollutants.join(', ')}
                </div>
            )}
            <button onClick={handleReset}>Reset</button>
        </ChartMenuContainer>
    );
};

export default ScatterChartMenu;