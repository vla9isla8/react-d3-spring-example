import {arc, pie, PieArcDatum} from "d3-shape";
import {scaleOrdinal} from "d3-scale";
import {ascending} from "d3-array";
import {useCallback, useMemo, useState} from "react";
import {animated, to, useSpring} from "@react-spring/web";

const width = 450,
    height = 450, radius = width / 2;

type Datum = { key: string, value: number };

const colors = [
    "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
    "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"
];

const keys = ["a", "b", "c", "d", "e", "f"]

const color = scaleOrdinal<string>()
    .domain(keys)
    .range(colors);

const angle = arc<{ startAngle: number, endAngle: number }>()
    .outerRadius(radius - 10)
    .innerRadius(radius - radius / 2)
    .padAngle(0.03);

function Arc(props: PieArcDatum<Datum>) {
    const {data, startAngle, endAngle} = props
    const springs = useSpring({
        to: {startAngle, endAngle}
    });
    const d = useMemo(() => to(
            [springs.startAngle, springs.endAngle],
            (endAngle, startAngle) => angle({startAngle, endAngle})),
        [springs.endAngle, springs.startAngle]);

    return (
        <animated.path
            fill={color(data.key)}
            d={d}
        />
    )
}

const pieChart = pie<Datum>().sort((a, b) => ascending(a.key, b.key))
    .value(d => d.value)

function Graph() {

    const [data, setData] = useState<PieArcDatum<Datum>[]>([])

    const changeData = useCallback(() => {
        const numbers = keys
            .map((key) => ({
                key,
                value: Math.random() * 10
            }));
        setData(pieChart(numbers));
    }, []);

    return <>
        <button onClick={changeData}>Change</button>
        <svg viewBox={`0 0 ${width} ${height}`}>
            <g transform={`translate(${radius}, ${radius})`}>
                {data.map((value) => (
                    <Arc
                        key={value.data.key}
                        {...value}
                    />
                ))}
            </g>
        </svg>
    </>
}

export default Graph;
