import {FC} from "react";
import { DefaultLayout } from "../../components/layout/DefaultLayout";
import {Hero} from "./Hero";
import {Offer} from "./Offer";
import {GetInTouch} from "./GetInTouch";
import {Achievements} from "./Achievements";
import {Latest} from "./Latest";
import {CallToAction} from "./CallToAction";

const Home: FC = () => {
  return (
    <DefaultLayout>
      <Hero />
      <Offer />
      <GetInTouch />
      <Achievements />
      <Latest />
      <CallToAction />
    </DefaultLayout>
  )
}

export default Home
