import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { collaborators_data } from "../../data";


export default function Graph1 () {

  return (
             <ResponsiveContainer width="100%" height={300}>
          <BarChart style={{ marginTop: "2rem" }} data={collaborators_data}>
            <CartesianGrid vertical={false} stroke="#ECECEC" />
            <XAxis
              tickMargin={15}
              tickLine={false}
              axisLine={false}
              dataKey="year"
            />
            <YAxis
              tickMargin={15}
            />
            <Bar
              dataKey="revenue"
              fill="#4D3146"
              maxBarSize={30}
              radius={[7.5, 7.5, 7.5, 7.5]}
            />
          </BarChart>
        </ResponsiveContainer>
  )
}