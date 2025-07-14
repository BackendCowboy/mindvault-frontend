type JournalCardProps = {
  title: string;
  date: string;
  summary: string;
};

export default function JournalCard({ title, date, summary }: JournalCardProps) {
  return (
    <div className="border rounded-2xl p-4 shadow-sm hover:shadow-md transition-all">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{date}</p>
      <p className="mt-2 text-sm">{summary}</p>
    </div>
  );
}