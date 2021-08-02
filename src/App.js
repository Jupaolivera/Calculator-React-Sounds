import Calculator from "./components/Calculator/Calculator";
import Particles from "react-tsparticles";
import particlesConfig from "./config/configParticles";

function App() {
    return (
        <div
            className="App"
            style={{
                position: "relative",
                overflow: "auto",
                height: "100vh",
                width: "100vw",
            }}
        >
            <div style={{ position: "absolute" }}>
                <Particles
                    height="100vh"
                    width="100vw"
                    params={particlesConfig}
                />
            </div>
            <Calculator />
        </div>
    );
}

export default App;
