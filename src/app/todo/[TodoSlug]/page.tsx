export default function Todo({ params }: { params: { TodoSlug: string } }) {
  console.log(params);

  return (
    <div>
      My Todo: <span>{params.TodoSlug}</span>
    </div>
  );
}
