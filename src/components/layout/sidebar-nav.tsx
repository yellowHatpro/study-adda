import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";

export const SidebarNav = () => {
    return (
        <ScrollArea className={" py-6 min-w-[300px]"}>
            {<Accordion type={"multiple"}>
                <AccordionItem value="guru">
                    <AccordionTrigger>
                        Guru
                    </AccordionTrigger>
                    <AccordionContent>
                        Ashu
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="student">
                    <AccordionTrigger>
                        Student
                    </AccordionTrigger>
                    <AccordionContent>
                        Ashutosh
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            }
        </ScrollArea>
    );
};


