// src/components/footer.tsx
export function Footer() {
  return (
    <footer className="mt-auto border-t border-border py-6 text-center text-sm text-muted-foreground">
      <div className="container mx-auto px-4">
        <p>
          ผู้จัดทำ: <span className="font-semibold text-foreground">ธนวิชญ์ ชัยดา</span> | รหัสนักศึกษา: <span className="font-mono font-semibold text-foreground">680610678</span>
        </p>
      </div>
    </footer>
  );
}