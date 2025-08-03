import { Test, compare, TestDiagnosticRule, TestExecutor } from "notus-qml-test";

@TestDiagnosticRule("property-definition-needs-prefix-rule")
export class PropertyDefinitionNeedsPrefixRuleTest {

    @Test('Propery definition needs prefix')
    testPropertyDefinition(executor: TestExecutor) {

        executor.addCase(
            {
                name: "Id invalid",
                code: `
                    Rectangle {
                        id: myRectangle
                    }
                `,
                report: function (data: any) {
                    compare(data.item, {
                        "message": "Id needs prefix: rect",
                        "severity": 2
                    });
                }
            }
        )


        executor.addCase(
            {
                name: "Valid Id",
                code: `
                    Rectangle {
                        id: rectMain
                    }
                `
            }
        )

        executor.run();
    }

}