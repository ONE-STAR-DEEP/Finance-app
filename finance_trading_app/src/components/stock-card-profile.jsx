import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "./ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import ChartAreaLinear from "./chart"
import { Input } from "./ui/input"
import { useEffect, useState } from "react"

export default function StockCard({ _id, quantity, stockid, userid }) {
    const [Quantity, setQuantity] = useState(0);
    const [stocks, setStocks] = useState({});

    useEffect(() => {
        async function fetchMe() {
            try {
                const res = await fetch(`http://localhost:5000/api/stocks/${stockid}`, {
                    method: "GET",
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch");
                }
                const data = await res.json();
                setStocks(data.data);
            } catch (err) {
                console.error(err);
            }
        }

        fetchMe();
    }, []);

    const handelPurchase = async () => {
        try {
            console.log(_id, userid);
            const response = await fetch('http://localhost:5000/api/buy/order',
                {
                    method: 'POST',
                    credentials: "include",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userid: userid,
                        stockid: _id,
                        quantity: Quantity
                    })
                })
            if (response.ok) {
                const data = await response.json();
                console.log(data)
            }
        } catch (error) {
            console.log(error);
        }

        alert("Thank you!!! Your order has been placed successfully.");
    }

    const positive = Number(stocks.change) >= 0
    return (
        <Card className="bg-card text-card-foreground border border-border/60 shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-lg">
            <CardHeader className="pb-2">
                <CardTitle className="flex items-baseline justify-between gap-2">
                    <span className="text-base font-medium">{stocks.name}</span>
                    <span className="text-sm text-muted-foreground">{stocks.ticker}</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex items-end justify-between pt-0">
                <p className="text-2xl font-semibold">₹{stocks.price}</p>
                <span
                    className={
                        (positive ? "text-primary bg-green-500/10" : "text-destructive bg-red-500/10") +
                        " inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium"
                    }
                    aria-label={positive ? "Price up" : "Price down"}
                    title={positive ? "Price up" : "Price down"}
                >
                    {positive ? (
                        <svg aria-hidden width="12" height="12" viewBox="0 0 24 24" className="fill-current">
                            <path d="M7 14l5-5 5 5H7z" />
                        </svg>
                    ) : (
                        <svg aria-hidden width="12" height="12" viewBox="0 0 24 24" className="fill-current">
                            <path d="M7 10l5 5 5-5H7z" />
                        </svg>
                    )}
                    {positive ? "+" : ""}
                    {stocks.change}%
                </span>
            </CardContent>
            <CardFooter className="pt-0 text-xs flex flex-col items-start text-muted-foreground gap-2">
                <div className="flex gap-2">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button className="rounded-full border-1 border-red-300 bg-white text-red-500 hover:bg-red-100">Sell</Button>
                        </PopoverTrigger>
                        <PopoverContent>Sell logic here.</PopoverContent>
                    </Popover>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button className="rounded-full border-1 border-green-300 bg-white text-green-500 hover:bg-green-100">Buy</Button>
                        </PopoverTrigger>
                        <PopoverContent className="flex flex-col gap-2">
                            <ChartAreaLinear></ChartAreaLinear>
                            <span>Quantity:</span>
                            <Input
                                placeholder="Quantity"
                                value={Quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                            <Button className="w-full bg-green-500 hover:bg-green-600" onClick={() => { handelPurchase() }}>Confirm Buy</Button>
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="flex gap-2">
                    <p>Owned: {quantity}</p>
                    <p>Value: ₹{stocks.price * quantity}</p>
                </div>
            </CardFooter>
        </Card>
    )
}
