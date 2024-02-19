import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabContentCrypto from "./TabContentCrypto";
import TabContentStocks from "./TabContentStocks";
import TabContentRareMetals from "./TabContentRareMetals";
import TabContentProperties from "./TabContentProperties";

const AssetsControl = () => {
    return (
        <Card className="pt-6 flex-grow">
            <CardContent>
                <Tabs defaultValue="crypto">
                    <TabsList>
                        <TabsTrigger value="crypto">Crypto</TabsTrigger>
                        <TabsTrigger value="stocks">Stocks</TabsTrigger>
                        <TabsTrigger value="rareMetals">Rare Metals</TabsTrigger>
                        <TabsTrigger value="properties">Properties</TabsTrigger>
                    </TabsList>

                    <TabsContent value="crypto">
                        <TabContentCrypto />
                    </TabsContent>

                    <TabsContent value="stocks">
                        <TabContentStocks />
                    </TabsContent>

                    <TabsContent value="rareMetals">
                        <TabContentRareMetals />
                    </TabsContent>

                    <TabsContent value="properties">
                        <TabContentProperties />
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
};

export default AssetsControl;
