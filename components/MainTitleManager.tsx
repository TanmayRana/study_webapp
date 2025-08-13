"use client";

import { useState, useEffect } from "react";
import { MainTitle } from "@/lib/types/maintitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Trash2, Edit, Plus, X, FolderOpen } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  fetchMainTitlesThunk,
  createMainTitleThunk,
  updateMainTitleThunk,
  deleteMainTitleThunk,
  clearError,
  selectMainTitles,
  selectMainTitleLoading,
  selectMainTitleError,
} from "@/lib/store/slices/mainTitleSlice";

export default function MainTitleManager() {
  const dispatch = useAppDispatch();
  const mainTitles = useAppSelector(selectMainTitles);
  const loading = useAppSelector(selectMainTitleLoading);
  const error = useAppSelector(selectMainTitleError);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [titleInput, setTitleInput] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchMainTitlesThunk());
  }, [dispatch]);

  // Save (Create / Update)
  const handleSave = async () => {
    if (!titleInput.trim()) return;

    try {
      if (editingId) {
        await dispatch(
          updateMainTitleThunk({ id: editingId, title: titleInput.trim() })
        ).unwrap();
      } else {
        await dispatch(
          createMainTitleThunk({ title: titleInput.trim() })
        ).unwrap();
      }
      setTitleInput("");
      setEditingId(null);
      setDialogOpen(false);
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  // Confirm Delete
  const confirmDelete = async () => {
    if (!deleteId) return;

    try {
      await dispatch(deleteMainTitleThunk(deleteId)).unwrap();
      setDeleteId(null);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const startCreate = () => {
    setEditingId(null);
    setTitleInput("");
    setDialogOpen(true);
  };

  const startEdit = (mainTitle: MainTitle) => {
    setEditingId(mainTitle._id);
    setTitleInput(mainTitle.title);
    setDialogOpen(true);
  };

  const getContentCount = (mainTitle: MainTitle) =>
    Array.isArray(mainTitle.contents) ? mainTitle.contents.length : 0;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Main Titles</h2>
        <Button onClick={startCreate}>
          <Plus className="h-4 w-4 mr-2" /> Add Title
        </Button>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription className="flex items-center justify-between">
            {error}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => dispatch(clearError())}
            >
              <X className="h-4 w-4" />
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Titles Grid */}
      {mainTitles.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">
          No titles found.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mainTitles.map((mainTitle) => (
            <Card key={mainTitle._id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{mainTitle.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Created:{" "}
                    {new Date(mainTitle.createdAt).toLocaleDateString()}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FolderOpen className="h-4 w-4" />
                    <span>Contents: {getContentCount(mainTitle)} items</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => startEdit(mainTitle)}
                    disabled={loading}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>

                  {/* Delete Dialog */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => setDeleteId(mainTitle._id)}
                        disabled={loading}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you sure you want to delete this title?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. The title and all its
                          contents will be permanently removed.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setDeleteId(null)}>
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={confirmDelete}
                          className="
                        bg-destructive 
                        text-white 
                        hover:bg-destructive/90 
                        dark:bg-destructive/80 
                        dark:text-destructive-foreground
                        dark:hover:bg-destructive/70                    
                      "
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Dialog for Create/Edit */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edit Title" : "Add New Title"}
            </DialogTitle>
          </DialogHeader>
          <Input
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            placeholder="Enter title..."
            disabled={loading}
            className="mb-4"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!titleInput.trim() || loading}
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
