"use client";

import AppShell from "@/components/layout/AppShell";
import { showToast } from "@/components/shared/Toast";
import Modal from "@/components/shared/Modal";
import { Plus, Search, Copy, Trash2, Edit2 } from "lucide-react";
import { useState } from "react";

interface Contact {
  id: string;
  name: string;
  address: string;
  initials: string;
}

const initialContacts: Contact[] = [
  { id: "1", name: "Alice M.", address: "0xA1b2...C3d4", initials: "AM" },
  { id: "2", name: "Bob K.", address: "0xB5c6...D7e8", initials: "BK" },
  { id: "3", name: "Carol S.", address: "0xC9d0...E1f2", initials: "CS" },
  { id: "4", name: "Dave L.", address: "0xD3e4...F5a6", initials: "DL" },
  { id: "5", name: "Maria G.", address: "0xE7f8...A9b0", initials: "MG" },
];

export default function AddressBookPage() {
  const [contacts, setContacts] = useState(initialContacts);
  const [search, setSearch] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newAddress, setNewAddress] = useState("");

  const filtered = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.address.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    if (!newName.trim() || !newAddress.trim()) return;
    const initials = newName
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
    setContacts([
      ...contacts,
      {
        id: crypto.randomUUID(),
        name: newName.trim(),
        address: newAddress.trim(),
        initials,
      },
    ]);
    setNewName("");
    setNewAddress("");
    setAddOpen(false);
    showToast(`${newName.trim()} added to address book`, "success");
  };

  const handleDelete = (id: string, name: string) => {
    setContacts(contacts.filter((c) => c.id !== id));
    showToast(`${name} removed from address book`, "info");
  };

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Address Book</h1>
            <p className="text-sm text-secondary mt-1">
              {contacts.length} saved contacts
            </p>
          </div>
          <button
            onClick={() => setAddOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent text-background text-sm font-semibold hover:bg-accent/90 transition"
          >
            <Plus className="w-4 h-4" />
            Add Contact
          </button>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search contacts..."
            className="w-full pl-9 pr-4 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition"
          />
        </div>

        <div className="bg-surface rounded-xl border border-border overflow-hidden">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted">
              {search ? `No contacts matching "${search}"` : "No contacts yet"}
            </div>
          ) : (
            <div className="divide-y divide-border">
              {filtered.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between px-5 py-3.5 hover:bg-surface-hover transition group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-highlight flex items-center justify-center text-xs font-bold text-secondary">
                      {c.initials}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{c.name}</div>
                      <div className="text-xs text-muted font-mono">
                        {c.address}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(c.address);
                        showToast("Address copied", "success");
                      }}
                      className="p-2 rounded-lg hover:bg-highlight text-muted hover:text-foreground transition"
                      title="Copy address"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(c.id, c.name)}
                      className="p-2 rounded-lg hover:bg-red-400/10 text-muted hover:text-red-400 transition"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <Modal
          open={addOpen}
          onClose={() => setAddOpen(false)}
          title="Add Contact"
        >
          <div className="space-y-4">
            <div>
              <label className="text-xs text-muted mb-1.5 block">Name</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Contact name"
                className="w-full px-4 py-2.5 bg-highlight border border-border rounded-lg text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition"
              />
            </div>
            <div>
              <label className="text-xs text-muted mb-1.5 block">
                Address
              </label>
              <input
                type="text"
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                placeholder="0x..."
                className="w-full px-4 py-2.5 bg-highlight border border-border rounded-lg text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition font-mono"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setAddOpen(false)}
                className="flex-1 py-2.5 rounded-lg border border-border text-secondary text-sm font-medium hover:bg-surface-hover transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                disabled={!newName.trim() || !newAddress.trim()}
                className="flex-1 py-2.5 rounded-lg bg-accent text-background text-sm font-semibold hover:bg-accent/90 transition disabled:opacity-40"
              >
                Save Contact
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </AppShell>
  );
}
