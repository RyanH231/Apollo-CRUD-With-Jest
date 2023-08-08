import {render, screen} from "@testing-library/react"
import GetDisney, {GET_DISNEY} from "../components/getDisney.tsx";
import {MockedProvider} from "@apollo/client/testing"


describe("It renders and display a list successfully", () => {
    const disneyMock ={
        request: {
            query:GET_DISNEY,
        },
        result:{
            data:{
                disney: {name:"The Incredibles", director:{firstName:"Brad", lastName:"Bird"}, year:2004}
            }
        }
    }

    it("renders the GetDisney component", async () => {
        render(
            <MockedProvider mocks={[disneyMock]}>
                <GetDisney/>
            </MockedProvider>
        )
        expect(await screen.findByText("Loading...")).toBeInTheDocument();
    })

    it("Renders the correct data using Apollo mock", async () => {
        
    })
})