import Typewriter from "typewriter-effect";

const Title_animated = () => {
    return (
        <>
         <div className="font-extrabold md:pb-0 pb-5 md:text-7xl text-5xl md:leading-[97px] leading-[40px] text-transparent bg-clip-text bg-gradient-to-r from-[#FF3BFF] via-[#DEACAC] to-[#5C24FF]">
            <Typewriter
              onInit={(typewriter) => {
                typewriter

                  .typeString("Translate")
                  .pauseFor(1000)
                  .deleteAll()
                  .typeString("Optimize")
                  .pauseFor(1000)
                  .deleteAll()
                  .typeString("Document")
                  .pauseFor(1000)
                  .deleteAll()
                  .typeString("Explain")
                  .pauseFor(1000)
                  .deleteAll()
                  .typeString("Transform your code!")
                  .start();
              }}
            />
          </div>
          <div className="font-medium md:text-7xl text-5xl md:leading-[50px] leading-[40px] text-center text-[#3E3E3E]">
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString("your code with AI")
                  .pauseFor(9500)
                  .deleteAll()
                  .typeString("With AI")
                  .start();
              }}
            />
          </div>
          </>
    );
}

export default Title_animated