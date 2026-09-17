import Container from "./Container";

const values = [
  {
    title: "Quality Products",
    description: "Carefully selected and quality-checked before they reach you.",
  },
  {
    title: "Secure Checkout",
    description: "Your orders are processed securely with clear payment instructions.",
  },
  {
    title: "Discreet Packaging",
    description: "Your privacy matters. All orders ship in plain, unmarked packaging.",
  },
  {
    title: "Customer Support",
    description: "Questions? Reach out to us directly. We're here to help.",
  },
];

export default function ValueProps() {
  return (
    <section className="border-y border-border py-16 md:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          {values.map((value) => (
            <div key={value.title}>
              <h3 className="text-sm font-medium uppercase tracking-wider text-foreground">
                {value.title}
              </h3>
              <p className="mt-3 text-muted leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
