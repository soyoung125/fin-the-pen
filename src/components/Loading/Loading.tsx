import {
  LoadingContainer,
  LoadingContent,
  LoadingContentBall,
} from "@components/Loading/Loading.styles.ts";

function Loading() {
  return (
    <LoadingContainer>
      <LoadingContent>
        {Array.from({ length: 10 }, () => null).map((_, i) => (
          <LoadingContentBall key={i} />
        ))}
      </LoadingContent>
    </LoadingContainer>
  );
}

export default Loading;
