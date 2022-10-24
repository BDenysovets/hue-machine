import {FC} from "react";
import { DefaultLayout } from "../../components/layout/DefaultLayout";
import {Hero} from "./Hero";
import {Offer} from "./Offer";
import {GetInTouch} from "./GetInTouch";
import {Achievements} from "./Achievements";
import {Latest} from "./Latest";
import {CallToAction} from "./CallToAction";
import {Cases} from "./Cases";
import {Works} from "./Works";

const Home: FC = () => {
  return (
    <DefaultLayout>
      <Hero />
      <Offer />
      <GetInTouch />
      <Achievements />
      <Cases />
      <Works />
      <Latest />
      <CallToAction />
    </DefaultLayout>
  )
}

export default Home
