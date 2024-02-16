import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabContentCrypto from "./TabContentCrypto";
import TabContentStocks from "./TabContentStocks";

const AssetsControl = () => {
    return (
        <Card className="pt-6 flex-grow">
            <CardContent>
                <Tabs defaultValue="crypto">
                    <TabsList>
                        <TabsTrigger value="crypto">Crypto</TabsTrigger>
                        <TabsTrigger value="stocks">Stocks</TabsTrigger>
                        <TabsTrigger value="gold">Gold</TabsTrigger>
                        <TabsTrigger value="properties">Properties</TabsTrigger>
                    </TabsList>

                    <TabsContent value="crypto">
                        <TabContentCrypto />
                    </TabsContent>

                    <TabsContent value="stocks">
                        <TabContentStocks />
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
};

export default AssetsControl;
