import React from "react";
import { dehydrate } from "@tanstack/query-core";

import FormMovie from "@/page-sessions/movie/FormMovie";
import getQueryClient from "@/contexts/react-query/getQueryClient";
import HydrateClient from "@/contexts/react-query/HydrateClient";
import HttpRequest from "@/lib/HttpRequest";

const httpRequest = new HttpRequest("/rs/crud/movies");

const getMovie = async (id) => {
  const res = await httpRequest.getById(id);
  const movie = await res.data;
  return movie;
};

const MoviePage = async ({ params }) => {
  const { id } = params;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["hydrate-movie-id"], async () =>
    getMovie(id)
  );
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrateClient state={dehydratedState}>
      <FormMovie movieId={id} />
    </HydrateClient>
  );
};

export default MoviePage;
