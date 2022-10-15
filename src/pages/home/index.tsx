import {FC} from "react";
import { DefaultLayout } from "../../components/layout/DefaultLayout";
import {Hero} from "./Hero";
import {Offer} from "./Offer";

const Home: FC = () => {
  return (
    <DefaultLayout>
      <Hero />
      <Offer />
    </DefaultLayout>
  )
}

export default Home
