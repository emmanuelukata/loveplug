import Container from "./Container";

export default function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <Container className="py-8 text-center text-sm text-muted">
        <p>&copy; {new Date().getFullYear()} Store. All rights reserved.</p>
      </Container>
    </footer>
  );
}
